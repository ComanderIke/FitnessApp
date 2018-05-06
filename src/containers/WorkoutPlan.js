import React, { Component } from 'react';
import WorkoutTable from "../components/WorkoutTable";
// import './App.scss';


class WorkoutPlan extends Component {
    render() {
        return (
            <div>
            <WorkoutTable />
            <WorkoutTable />
            <WorkoutTable />
            </div>
        );
    }
}

export default WorkoutPlan;
