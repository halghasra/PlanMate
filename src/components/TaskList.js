import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
    /* moved to App.js so this component won't need to manage its own state and instead should receive its data via props.
    constructor(props) {
        super(props);
        this.state = {
            task: [
                { description: 'First task', isCompleted: false},
                { description: 'Second task', isCompleted: false},
                { description: 'Third task', isCompleted: false},
            ]
        };
    }
    */

    render() {
        const taskItems = this.props.tasks.map((task, index) =>
            <Task key={index} description={task.description} isCompleted={task.isCompleted} />
        );

        return (
        <div>
            {taskItems}
        </div>
        );
    }
}

export default TaskList;