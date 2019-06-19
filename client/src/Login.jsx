import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Login = props => {
  const [username, setUsername] = useState("");

  /*
  if (username !== null) {
    return (
      <Redirect to="/Home" />
    )
  }
  */
 
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("username: " + username);
    props.setUsername(username);

    axios.post('/users', {
      username: username,      
    })
      .then(function (response) { 
        console.log("login-succes!")
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <div className={styles.loginWindow}>
      <div className="page">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={username}
          onChange={(e) =>
          setUsername(e.target.value)}
          placeholder="Username..." />
        <button type="submit" className="submit-btn">Login</button>
        <br></br>
        <h3> Welcome: {username}</h3> 
      </form>
      <Link to="/">Go choose a chatroom</Link>
    </div>
  )
}
export default Login