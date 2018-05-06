import React, { Component } from 'react';
import WorkoutTable from "../components/WorkoutTable";

import styled from 'styled-components'
import firebase from 'firebase';
require('firebase/firestore')
// import './App.scss';
const config = {
    apiKey: "AIzaSyDoKpTZmTMVHYc8rBBDeKTxftn-knM5aoM",
    authDomain: "fitnessapp-ccf69.firebaseapp.com",
    databaseURL: "https://fitnessapp-ccf69.firebaseio.com",
    projectId: "fitnessapp-ccf69",
    storageBucket: "",
    messagingSenderId: "6999279265"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings ={timestampsInSnapshots: true};
firestore.settings(settings);

// const testRef = firestore.collection('favorites').doc('test');
//
// firestore.collection('favorites').get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     })
// });
// firestore.collection('favorites').doc('beers')
//     .onSnapshot(doc => {
//         console.log("Current data: ", doc.data());
//     });
// firestore.collection('favorites').add({
//     name: "Justin Bieber",
//     country: "Canada",
// }).then(docRef => { console.log("Document ID: ", docRef.id); })
//     .catch(error => { console.error("Error: ", error); });
// firestore.collection('favorites').add({
//     name: "Carlsberg",
//     country: "Denmark",
//     type: "beer"
// });
// //Using set() instead of add() will either create a new document if it does not already exist, or overwrite the data if it does
// const docRef = firestore.collection('presidents').doc('obama');
// docRef.set({
//     name: "Obama",
//     favorites: { color: "Blue", subject: "drones" },
// });
// firestore.collection('presidents').doc('obama').update({
//     "name": "Barack",
//     "favorites.color": "Healthcare"
// });
// firestore.collection('presidents').doc('trump').delete()
//     .then(() => { console.log("Hooray!"); })
//     .catch(error => { console.log("NOOOOOOOOOOO!"); });

const Input = styled.input`
    height: 50px;
    background-color: #58F;
`;
var cnt = 1;
class WorkoutPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tableCnt: 1,
            tables: []
        };
        this.onClick=this.onClick.bind(this);
        this.persistEntries=this.persistEntries.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSetsChange = this.handleSetsChange.bind(this);
        this.handleRepsChange = this.handleRepsChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }
    newEntry(){
        return {
            name: "",
            reps: Array(4).fill(null),
            sets: Array(4).fill(null),
            weight: Array(4).fill(null)
        };
    }

    handleNameChange(tablenumber,i, name){
        const tables = this.state.tables.slice();
        if(tables[tablenumber].exercises[i])
            tables[tablenumber].exercises[i].name = name;
        else{
            tables[tablenumber].exercises[i] = this.newEntry()
            tables[tablenumber].exercises[i].name = name;
        }
        this.setState({
            ...this.state,
            tables: tables});
    }
    handleSetsChange(tablenumber,i, setsindex, sets){
        const tables = this.state.tables.slice();
        if(tables[tablenumber].exercises[i])
            tables[tablenumber].exercises[i].sets[setsindex] = sets;
        else{
            tables[tablenumber].exercises[i] = this.newEntry()
            tables[tablenumber].exercises[i].sets[setsindex] = sets;
        }
        this.setState({
            ...this.state,
            tables: tables});
    }
    handleRepsChange(tablenumber,i, repsindex, reps){
        const tables = this.state.tables.slice();
        if(tables[tablenumber].exercises[i])
            tables[tablenumber].exercises[i].reps[repsindex] = reps;
        else{
            tables[tablenumber].exercises[i] = this.newEntry()
            tables[tablenumber].exercises[i].reps[repsindex] = reps;
        }
        this.setState({
            ...this.state,
            tables: tables});
    }
    handleWeightChange(tablenumber,i, weightindex, weight){
        const tables = this.state.tables.slice();
        if(tables[tablenumber].exercises[i])
            tables[tablenumber].exercises[i].weight[weightindex] = weight;
        else{
            tables[tablenumber].exercises[i] = this.newEntry()
            tables[tablenumber].exercises[i].weight[weightindex] = weight;
        }
        this.setState({
            ...this.state,
            tables: tables});
    }
    componentDidMount(){
        console.log("loading...");
         for(var day=1; day < 100; day++) {
             this.createTable("Day"+day, day-1);

         }

    }
    createTable(tableName, index){

        var exercises = Array(9).fill(null);
        const tabledata=firestore.collection(tableName);
        tabledata.get().then(querySnapshot=> {
            if(querySnapshot.size==0){
                return;
            }
            else{
                console.log("create Table: " +tableName);
                tabledata.get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        console.log(`${doc.id} => ${doc.data()}`);
                        this.setState({
                            ...this.state,
                            loading:false
                        });
                        exercises[doc.data().number] = {
                            ...exercises[doc.data().number],
                            name: doc.data().name,

                        };
                        console.log("WTF" +doc.data().number+" "+exercises[doc.data().number]);
                        if(doc.data().sets) {
                            console.log(doc.data().sets[0]);
                            console.log(doc.data().sets[1]);
                            console.log(doc.data().sets[2]);
                            console.log(doc.data().sets[3]);
                            exercises[doc.data().number] = {
                                ...exercises[doc.data().number],
                                sets: [
                                    doc.data().sets[0],
                                    doc.data().sets[1],
                                    doc.data().sets[2],
                                    doc.data().sets[3]
                                ]
                            }
                        }
                        if(doc.data().reps) {
                            exercises[doc.data().number] =
                                {
                                    ...exercises[doc.data().number],
                                    reps: [
                                        doc.data().reps[0],
                                        doc.data().reps[1],
                                        doc.data().reps[2],
                                        doc.data().reps[3]
                                    ]
                                }
                        }
                        if(doc.data().weight) {
                            exercises[doc.data().number] =
                                {
                                    ...exercises[doc.data().number],
                                    weight: [
                                        doc.data().weight[0],
                                        doc.data().weight[1],
                                        doc.data().weight[2],
                                        doc.data().weight[3]
                                    ]
                                }
                        }
                    })
                    console.log(exercises[0]);
                        var table ={
                            name: tableName,
                            exercises: exercises
                        };
                        const tables = this.state.tables.slice();
                        if(tables[index]) {
                            tables[index] = table;
                            console.log("edit table " +index);
                        }
                        else {
                            tables.push(table);
                            console.log("push table " +index);
                        }
                        this.setState({
                            ...this.state,
                            tables:  tables
                        })
                }

                );

            }
        });


    }
    persistEntries(tablenumber){
        const table= this.state.tables[tablenumber];
        if(table) {
            if(table.name && table.exercises) {
                console.log("persist Entries: " +table.name);
                for(var i = 0; i < table.exercises.length; i++) {
                    if(table.exercises[i]&&table.exercises[i].name!="") {
                        console.log("persist : " +table.exercises[i].name);
                        firestore.collection(table.name).doc("Exercise"+(i+1)).set({
                            name: table.exercises[i].name,
                            sets: [
                                table.exercises[i].sets[0],
                                table.exercises[i].sets[1],
                                table.exercises[i].sets[2],
                                table.exercises[i].sets[3]
                            ],
                            reps: [
                                table.exercises[i].reps[0],
                                table.exercises[i].reps[1],
                                table.exercises[i].reps[2],
                                table.exercises[i].reps[3]
                            ],
                            weight: [
                                table.exercises[i].weight[0],
                                table.exercises[i].weight[1],
                                table.exercises[i].weight[2],
                                table.exercises[i].weight[3]
                            ],
                            number: i
                        });
                    }
                }
            }
            else
                console.log("nothing to persist!");
        }
        else
            console.log("nothing to persist!");
    }
    onClick(event){
        const tables = this.state.tables.slice();
        var table ={
            name: "Day"+(this.state.tableCnt+1),
            exercises: Array(9).fill(null)
        };
        tables.push(table);
        this.setState({
            ...this.state,
            tables: tables,
            tableCnt: this.state.tableCnt+1
        });
    }
    render() {
        if(this.state.loading){
            return (
            <div>
                <h1>Loading Data...</h1>
            </div>
            );
        }
        else {
            var tables= [];
            for(var i=0; i < this.state.tableCnt; i++){
                tables.push(<div key={i}><h1>Day {i+1}</h1><WorkoutTable number={i} tableData={this.state.tables[i]}name={"Day"+(i+1)} persistEntries={this.persistEntries} handleNameChange={this.handleNameChange} handleSetsChange={this.handleSetsChange} handleRepsChange={this.handleRepsChange} handleWeightChange={this.handleWeightChange} rows={9}/></div>);
            }
            return (


                <div>
                    {tables}
                    <Input type="button" onClick={this.onClick} value="Add Table!"/>
                </div>

            );
        }
    }
}

export default WorkoutPlan;
