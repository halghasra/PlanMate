import React, { Component } from 'react';
import { auth } from './firebase';
import Auth from './components/Auth';
//import './App.css'; will be added later once I define App.css
//import TaskList from './components/TaskList' testing completed, this will be disabled until the tasklist is used again

class App extends Component {
  state = { user: null };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    const { user } = this.state;
    return user ? <p>Welcome, {user.email}</p> : <Auth />;
  } //Replaced SignUp and Login with Auth
}

/*
This is removed for now following a successful test for the tasks list, it will be added later when the tasks list 
is introduced to the app.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tasks: [
            { description: 'First task', isCompleted: false},
            { description: 'Second task', isCompleted: false},
            { description: 'Third task', isCompleted: false},
        ]
    };
  }

  render() {
    return (
      <div className="App">
        <TaskList tasks={this.state.tasks}/>
      </div>
    );
  }
}
*/

export default App;