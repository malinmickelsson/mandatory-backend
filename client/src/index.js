import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home.jsx';
import Login from './Login.jsx';
import ChatRoom from './ChatRoom';
import NotFound from './NotFound'; // WORKS!
import styles from './styles.module.css';

class App extends React.Component {
  state = {
    username: null,
  }

  setUsername(name) {
    this.setState({username: name});
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Login" render={(props => <Login setUsername={name => this.setUsername(name)} />)} />
          <Route path="/chatroom" render={(props) => <ChatRoom username={this.state.username}/>} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('root'));