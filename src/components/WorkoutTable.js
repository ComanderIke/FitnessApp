import React, { Component } from 'react';
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import styled from "styled-components";
// import './App.scss';
const suggestedExercises = [
    {
        name: "Bizeps Curls",
        image: require('../img/bizeps.jpg'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "Deadlifts",
        image: require('../img/deadlift.png'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "Squats",
        image: require('../img/squats.png'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "BenchPress",
        image: require('../img/benchpress.png'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "Pullups",
        image: require('../img/pullups.png'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "Crunches",
        image: require('../img/crunches.png'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "ShoulderPress",
        image: require('../img/shoulder.png'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "Dips",
        image: require('../img/dips.jpg'),
        reps: 8,
        sets: 3,
        weight: 10
    },
    {
        name: "PushUps",
        image: require('../img/pushup.png'),
        reps: 20,
        sets: 3,
        weight: 0
    }];
const TableDiv = styled.div`
        border: 1px solid gray;
        margin: 0px 0px 25px 0px;
        display: inline-block;
`;
const Input = styled.input`
    height: 50px;
    background-color: #58F;
`;
class WorkoutTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            exercises: Array(9).fill(null)
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSetsChange = this.handleSetsChange.bind(this);
        this.handleRepsChange = this.handleRepsChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.onClick= this.onClick.bind(this);
    }
    handleNameChange(i, name){
        this.props.handleNameChange(this.props.number, i,name);
    }
    handleSetsChange(i, setsindex, sets){
        this.props.handleSetsChange(this.props.number, i,setsindex,sets);
    }
    handleRepsChange(i, repsindex, reps){
        this.props.handleRepsChange(this.props.number, i,repsindex,reps);
    }
    handleWeightChange(i, weightindex, weight){
        this.props.handleWeightChange(this.props.number, i,weightindex,weight);
    }
    onClick(event){

        this.props.persistEntries(this.props.number);
    }
    render() {
        const tablerows = [];

        for(var i = 0; i < this.props.rows; i++){
            tablerows.push(<TableRow key={i}index={i} rowData={this.props.tableData && this.props.tableData.exercises[i] ? this.props.tableData.exercises[i]:""} progress={true} columnsets={4} suggestedExercise={suggestedExercises[i]} handleNameChange={this.handleNameChange}
                                     handleSetsChange={this.handleSetsChange} handleRepsChange={this.handleRepsChange} handleWeightChange={this.handleWeightChange}/>);
        }
        return (
            <div>

            <TableDiv>

                <TableHeader columnsets={4}/>
                {tablerows}

            </TableDiv>
            <Input type="button" value="Save to Firestore" onClick={this.onClick}/>
            </div>
            // <TableRow />
            // <TableRow />
        );
    }
}

export default WorkoutTable;
