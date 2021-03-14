import { useContext, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import FriendList from './components/FriendList';
import ChatRoom from './components/ChatRoom';
import EmptyChatRoom from './components/EmptyChatRoom';
import { FlexContainer } from './components/StyleComponents';
import { ChatContext } from './context/Chat';
import { ChatShape } from './helpers/dummyData';
import { colors } from './helpers/colors';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  h2 {
    margin: 0;
  }
`;


const MainContainer = styled(FlexContainer)`
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 5rem 0rem;
  background-color: ${colors.light_blue};

  & > div:first-child {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    margin: auto;
    border-radius: 1rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    background-color: #fff;
  }

  @media (min-width: 640px) {
    padding: 5rem 2rem;
  }

  @media (min-width: 1100px) {
    padding: 5rem 6rem;
  }

  @media (min-width: 1280px) {
    padding: 5rem 10rem;
  }
`;

function App(): JSX.Element {
  const { chats } = useContext(ChatContext);
  const [currentChat, setChat] = useState<ChatShape>({
    id: '',
    name: '',
    src: '',
    messages: [],
  });

  const selectChat = (chat: ChatShape): void => {
    setChat(chat)
  };

  return (
    <MainContainer>
      <GlobalStyle />
      <div>
        <FriendList
          chats={chats}
          selectChat={selectChat}
          currentChat={currentChat}
        />
        {currentChat && currentChat.name ? (
          <ChatRoom chat={currentChat} />
        ) : (
          <EmptyChatRoom />
        )}
      </div>
    </MainContainer>
  );
}

export default App;
