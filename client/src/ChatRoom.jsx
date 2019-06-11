import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import openSocket from 'socket.io-client';
import axios from 'axios';
import styles from './styles.module.css';

let io = require('socket.io-client');
let socket = io("http://localhost:3001");

const ChatRoom = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const username = props.username;

  useEffect(() => {
    socket.on('data', value => {
      setMessages(messages => {
        return [...messages, value];
      });
    });

    return () => {
      socket.off('data');
    };
  }, []);

  const typeMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { username, content: message });
  }


  return (
    <div className="container">
      <div className="chatroom-container">
        <div className="chat-form">
          <form onSubmit={(e) => typeMessage(e)}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="text..." />
            <button type="submit" className="submit-btn">Send</button>
          </form>

          <div className="chatroom">
            {messages.map(message => 
              <ul>
              <li className={styles.username}> {message.username}  
              <span className={styles.timestamp}>timestamp </span>   
              <p className={styles.message}>{message.content}</p></li>
              </ul>)}
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatRoom 