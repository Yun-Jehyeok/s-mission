import React from 'react';
import { Link } from 'react-router-dom';

function Home({ userName, roomName, setUserName, setRoomName }) {
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  localStorage.setItem('userName', userName);
  localStorage.setItem('roomname', roomName);

  return (
    <div>
      <label for="roomName">Room</label>
      <input name="roomName" onChange={handleRoomNameChange}></input>
      <label for="id">ID</label>
      <input name="id" onChange={handleUserNameChange}></input>
      <button>
        <Link to="/Chat">새로운 방 만들기</Link>
      </button>
      <button>
        <Link to="/Chat">채팅 참여하기</Link>
      </button>
    </div>
  );
}

export default Home;
