import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Message from './Message';
import { ChatContext } from '../context/Chat';
import { ChatShape, MessageShape } from '../helpers/dummyData';
import { colors } from '../helpers/colors';
import { ReactComponent as SendIcon } from '../assets/send.svg';

interface ChatRoomProps {
  chat: ChatShape;
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Messages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  overflow-y: auto;

  & > div:first-child {
    margin-top: auto;
  }

  & > :not(div:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Form = styled.form`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;

  & > input {
    flex: 1;
    height: 3rem;
    padding: 0 1rem;
    border: 1px solid ${colors.primary_200};
    border-radius: 1.5rem;
    outline: 0px;
    background-color: #fff;
  }

  & > button:last-child {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    border-radius: 1.5rem;
    border: 0;
    outline: 0px;
    background-color: ${colors.primary_200};
    cursor: pointer;

    &:hover {
      background-color: ${colors.primary_300};
    }
  }
`;

function ChatRoom({ chat }: ChatRoomProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { chats } = useContext(ChatContext);
  const { sendChat } = useContext(ChatContext);
  const [inputValue, setInput] = useState('');
  const [messages, setMessages] = useState<MessageShape[]>(chat.messages);

  useEffect(() => {
    scrollToBottom();
  }, [chat.id]);

  useEffect(() => {
    const chatMessages = chats.find(currentChat => currentChat.id === chat.id);

    if (!!chatMessages) {
      setMessages(chatMessages.messages);
      scrollToBottom();
    }
  }, [chats, chat.id]);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue && inputValue.trim()) {
      sendChat({
        message: inputValue,
        authorId: '1', // hard coding the authorId to 1 because no authentication setup
        friendId: chat.id
      });
      setInput('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const scrollToBottom = () => {
    if (containerRef && containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight;
      const height = containerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;

      containerRef.current.scrollTop = maxScrollTop;
    }
  };

  return (
    <Container>
      <Messages ref={containerRef} id="message-container">
        {messages.map((message: MessageShape): JSX.Element => {
          return (
            <Message key={message.id} message={message}/>
          );
        })}
      </Messages>
      <Form
        autoComplete="off"
        onSubmit={handleSubmit}>
        <input
          name="message"
          placeholder="Type a message"
          value={inputValue}
          onChange={handleInputChange}
          data-testid="message-input"
        />
        <button data-testid="message-submit"><SendIcon /></button>
      </Form>
    </Container>
  );
}

export default ChatRoom;
