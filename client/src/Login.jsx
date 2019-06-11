import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const Login = props => {
  const [username, setUsername] = useState("");

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
    <div className="container">
      <Link to="/">Back</Link>
      <div className="page">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={username}
          onChange={(e) =>
          setUsername(e.target.value)}
          placeholder="Username..." />
        <br></br>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  )
}
export default Login