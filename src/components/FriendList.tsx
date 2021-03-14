import styled from 'styled-components';

import Avatar from './Avatar';
import { Heading, Text, FlexContainer } from './StyleComponents';
import { colors } from '../helpers/colors';
import { ChatShape } from '../helpers/dummyData';

interface FriendListProps {
  chats: ChatShape[];
  selectChat: (chat: ChatShape) => void;
  currentChat: ChatShape;
}

const Container = styled.div`
  width: 30%;
  padding: 1rem 0;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-right: 1px solid ${colors.primary_200};
`;

const ListContainer = styled.div`
  height: calc(100% - 44px);
  overflow-y: auto;
`;

const Friend = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ selected }: { selected?: boolean }) => selected ? colors.gray_200 : '#fff'};

  :hover {
    background-color: ${colors.gray_200};
  }

  & > div:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


function FriendList({ chats, selectChat, currentChat }: FriendListProps): JSX.Element {
  return (
    <Container>
      <Heading margin="0 0 1rem 0" padding="0 1rem" color={colors.black_100} data-testid="page-title">
        Chats
      </Heading>
      <ListContainer>
        {chats.map((chat, index) => {
          return (
            <Friend
              key={`${chat.id}-${index}`}
              onClick={() => selectChat(chat)}
              data-testid="friend"
              selected={currentChat.id === chat.id}>
              <Avatar name={chat.name} src={chat.src} />
              <FlexContainer margin="0 0 0 0.7rem">
                <Text data-testid="friend-name" color={colors.black_100}>{chat.name}</Text>
              </FlexContainer>
            </Friend>
          );
        })}
      </ListContainer>
    </Container>
  );
}

export default FriendList;
