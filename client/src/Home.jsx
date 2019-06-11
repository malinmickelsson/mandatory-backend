import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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


  const deleteRoom = (e) => {
    e.preventDefault();
    axios.delete('/chatroom', {
      id: chatroom,
    })
      .then(function (response) {
        alert('Room Deleted')
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
        <ul>
          {rooms.map(data => <li><Link to={`/chatroom?id=${data}`} > {data} </Link> <button onClick={deleteRoom}> x </button> </li>)}
        </ul>
      </div> 
        <div className="links">
          <Link to="/Login" className="login">Login</Link>
        </div>
    </div>
  );
}
export default Home