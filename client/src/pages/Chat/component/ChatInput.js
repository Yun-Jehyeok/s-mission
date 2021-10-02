import React, { useState } from 'react';

function ChatInput({ userName, socket }) {
  const [chatMessage, setChatMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('onSend', {
      userName: userName ? userName : localStorage.getItem('userName'),
      msg: chatMessage,
      timeStamp: new Date().toLocaleTimeString(),
    });

    setChatMessage('');
  };

  const onChatMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="메세지를 입력하세요."
          value={chatMessage}
          onChange={onChatMessageChange}
        />
        <button>전송</button>
      </form>
    </div>
  );
}

export default ChatInput;
