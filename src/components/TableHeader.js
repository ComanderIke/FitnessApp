import React, { Component } from 'react';
import styled from 'styled-components'

const FirstHeader = "Muscle"
const SecondHeader = "Exercise"

const Column = styled.span`
        border: 1px solid gray;
        display: inline-block;
        height: 50px;
`;
const FirstColumn = styled(Column)`;
        width: 155px;
        
`;
const ProgressColumn = styled(Column)`
        width: 100px;
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
        // display: inline-block;
        align-self: top;
`;
const ImageColumn = styled(Column)`
        width: 50px;
`;
class TableHeader extends Component {
    render() {
        const weights = [];
        for(var i=0; i < this.props.columnsets; i++){
            weights.push(<GroupColumn key={i}><NumberColumn ><ColumnText>Sets</ColumnText></NumberColumn>
                <NumberColumn ><ColumnText>Reps</ColumnText></NumberColumn><NumberColumn ><ColumnText>Wt</ColumnText></NumberColumn></GroupColumn>);
        }
        return (
            <div ><ImageColumn><ColumnText>{FirstHeader}</ColumnText></ImageColumn><FirstColumn><ColumnText>{SecondHeader}</ColumnText></FirstColumn>{weights}<ProgressColumn><ColumnText>Progress</ColumnText></ProgressColumn></div>
        );
    }
}

export default TableHeader;
