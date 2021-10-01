import ChatInput from 'pages/Chat/component/ChatInput';
import ChatLog from 'pages/Chat/component/ChatLog';
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Loading from './Loading';

function Chat({ roomName, userName }) {
  const myInfo = {
    roomName: roomName ? roomName : localStorage.getItem('roomName'),
    userName: userName ? userName : localStorage.getItem('userName'),
  };
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient('localhost:7000'));
  }, []);

  if (currentSocket) {
    currentSocket.on('connect', () => {
      currentSocket.emit('join', myInfo);
    });
  }

  return (
    <div>
      {currentSocket ? (
        <>
          <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput>
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
}

export default Chat;
