import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: this.props.isCompleted,
            description: this.props.description || ''
        };
    }

    render() {
        return (
            <div>
                <input
                   type="checkbox"
                    checked={this.state.isCompleted}
                    onChange={this.handleCheckboxChange}
                />
                <span>{this.state.description}</span>
            </div>
        );
    }

    handleCheckboxChange = () => {
        this.setState({ isCompleted: !this.state.isCompleted });
    };
}

export default Task;