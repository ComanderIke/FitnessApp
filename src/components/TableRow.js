import React, { Component } from 'react';
import styled from 'styled-components'

const Column = styled.div`
        border: 1px solid gray;
        display: inline-block;
        height: 50px;
        float: left;
`;
const FirstColumn = styled(Column)`;
        
        width: 155px;
`;
const ProgressColumn = styled(Column)`
        width: 100px;
`;
const ImageColumn = styled(Column)`
        width: 50px;
        
`;
const NumberColumn = styled(Column)`
        width: 50px;
        border-left-width: 0px;
        border-top-width: 0px;
        border-bottom-width: 0px;
        border-right-width: 1px;
        
`;
const GroupColumn = styled(Column)`
        border: 1px solid black;
        padding: 0px;
`;
const ColumnText=   styled.p`
        text-align: center;
`;
const Input=styled.input`
        width: ${props => props.width  ? props.width : '100%'};
        height: 98%;
        border 0px;
        text-align: center;
        font-weight: bold;
        &::-webkit-input-placeholder {
            color: black;
            opacity: 0.5;
          }
`;
const Img=styled.img`
        width: ${props => props.width  ? props.width : '40px'};
        height: 40px;
        border: 0px;
        display: block;
        margin: 0 auto;
        
`;


class TableRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            index: props.index};
        this.handleNameChange= this.handleNameChange.bind(this);
        this.handleSetsChange= this.handleSetsChange.bind(this);
        this.handleRepsChange= this.handleRepsChange.bind(this);
        this.handleWeightChange= this.handleWeightChange.bind(this);
        this.onBlur=this.onBlur.bind(this);
    }
    handleNameChange(event){
        console.log(event.target.value);
        this.setState({
            ...this.state,
            editing:true
        });
        this.props.handleNameChange(this.state.index, event.target.value);
    }
    handleSetsChange(i,event){
        this.props.handleSetsChange(this.state.index, i, event.target.value);
    }
    handleRepsChange(i,event){
        this.props.handleRepsChange(this.state.index, i, event.target.value);
    }
    handleWeightChange(i,event){
        this.props.handleWeightChange(this.state.index, i, event.target.value);
    }
    onClick(event){

    }
    onBlur(event){
        this.setState({
            ...this.state,
            editing:false
        });
    }
    render() {
        const weights = [];
        for(var i=0; i < this.props.columnsets; i++){
            weights.push(<GroupColumn key={i}><NumberColumn ><Input type="number"  value={this.props.rowData && this.props.rowData.sets && this.props.rowData.sets[i] ? this.props.rowData.sets[i]:""} onClick={this.onClick} onChange={this.handleSetsChange.bind(this, i)} placeholder={i===0 ?this.props.suggestedExercise ? this.props.suggestedExercise.sets :"":""}/></NumberColumn>
                <NumberColumn ><Input type="number" value={this.props.rowData && this.props.rowData.reps && this.props.rowData.reps[i] ? this.props.rowData.reps[i]:""} onClick={this.onClick}  onChange={this.handleRepsChange.bind(this, i)} placeholder={i===0 ? this.props.suggestedExercise ? this.props.suggestedExercise.reps :"" : ""}/></NumberColumn><NumberColumn >
                    <Input type="number"  value={this.props.rowData && this.props.rowData.weight && this.props.rowData.weight[i]? this.props.rowData.weight[i]:""}  onClick={this.onClick} onChange={this.handleWeightChange.bind(this, i)} placeholder={i===0 ?this.props.suggestedExercise ? this.props.suggestedExercise.weight :"":""}/></NumberColumn></GroupColumn>);
        }
        var nameComponent = <Input
        index={0} value={this.props.rowData && this.props.rowData.name ? this.props.rowData.name : ""}
        onClick={this.onClick} onChange={this.handleNameChange}
        placeholder={this.props.suggestedExercise ? this.props.suggestedExercise.name : ""}/>;

        return (
            <div><ImageColumn><Img src={this.props.suggestedExercise ? this.props.suggestedExercise.image : ""}/></ImageColumn><FirstColumn>{nameComponent}</FirstColumn>
                {weights}<ProgressColumn><ColumnText>{this.props.progress ? "+" : "-"}</ColumnText></ProgressColumn>
            </div>
        );

    }
}

export default TableRow;
