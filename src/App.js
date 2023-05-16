import React from 'react';
import TaskList from './Components/TaskList'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>PlanMate</h1>
        <TaskList />
      </div>
    );
  }
}

export default App;