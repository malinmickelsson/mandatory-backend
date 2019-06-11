import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const Home = () => {

  const [chatroom, setChatroom] = useState("");
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    axios.get('/chatRoom')
      .then(function (response) {
        console.log(response);

        setRooms(response.data)

        console.log(response.data);
      });

    }, []);


  const createRoom = (e) => {
    e.preventDefault();
    console.log('new chatroom: ' + chatroom);
    axios.post('/chatroom', {
      id: chatroom,
    })
      .then(function (response) {
        console.log(response);
        alert('chatroom created')
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const deleteRoom = data => {
    axios.delete((`chatroom/${data.id}`), {
      
    })
      .then(function (response) {
        alert('Room Deleted')
        console.log(data.id);
        console.log(data.id);
        console.log(data.id);
        
        console.log(data);
        console.log(data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="Page">
        <h2>Home</h2>
        <div className="create">
          <h4>Create chatroom</h4>
          <form onSubmit={(e) => createRoom(e)}>
            <input type="text" 
                   value={chatroom} 
                   onChange={(e) => 
                   setChatroom(e.target.value)} 
                   placeholder="Room name..." />
            <button type="submit" className="submit-btn">Create Room</button>
          </form>
        </div>

      </div>
      <div className="show">
        <h4>Rooms</h4>
        <br></br>
        <ul>
          {rooms.map(data => <li><Link to={`/chatroom?id=${data}`} > {data} </Link> <button value={data} onClick={deleteRoom}> x </button> </li>)}
        </ul>
      </div> 
      <br></br>
        <div className="links">
          <Link to="/Login" className="login">Back to LOGIN</Link>
        </div>
    </div>
  );
}
export default Home