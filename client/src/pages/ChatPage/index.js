import { Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  ChatBox,
  ChatContainer,
  UserList,
  Wrap,
  ChatList,
  ChatForm,
} from './style';

function ChatPage() {
  const [chatMessage, setChatMessage] = useState('');

  return (
    <ChatContainer>
      <Wrap>
        <UserList></UserList>
        <ChatBox>
          <ChatList></ChatList>
          <ChatForm>
            <Input />
            <Button type="primary">Send</Button>
          </ChatForm>
        </ChatBox>
      </Wrap>
    </ChatContainer>
  );
}

export default ChatPage;
