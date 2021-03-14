import styled from 'styled-components';
import { formatDistance } from 'date-fns';

import { Text } from './StyleComponents';
import Avatar from './Avatar';
import { MessageShape } from '../helpers/dummyData';
import { colors } from '../helpers/colors';


interface MessageProps {
  message: MessageShape;
};

interface ContainerProps {
  isFriend: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: flex-end;
  justify-content: ${({ isFriend }) => isFriend ? 'flex-start' : 'flex-end'};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 2.5rem;
  max-width: 70%;
  margin-left: 0.3rem;

  & > div:first-child {
    margin-bottom: 0.3rem;
    padding: 0.7rem;
    border-radius: 0.8rem;
    border-bottom-left-radius: ${({ isFriend }: { isFriend: boolean}) => isFriend ? '0' : '0.8rem'};
    background-color: ${({ isFriend }: { isFriend: boolean}) => isFriend ? colors.gray_200 : colors.primary_100};
  }

  & > span {
    align-self: ${({ isFriend }: { isFriend: boolean}) => isFriend ? 'flex-start' : 'flex-end'};
  }
`;

const AvatarContainer = styled.div`
  width: 30px;
  padding-bottom: 15px;
`;

function Message(props: MessageProps): JSX.Element {
  const { message, author, createdAt } = props.message;
  const isFriend = author.id !== '1';

  return (
    <Container isFriend={isFriend} data-testid="messages">
      {isFriend ? (
        <AvatarContainer>
          <Avatar
            size={30}
            name={author.name}
            src={author.src} />
        </AvatarContainer>
      ) : null}
      <ContentContainer isFriend={isFriend}>
        <div>
          <Text
            data-testid="message-text"
            fontSize="0.8rem"
            color={isFriend ? colors.black_100 : '#fff'}>{message}</Text>
        </div>
        <Text
          fontSize="0.5rem"
          color={colors.black_100}>
          {formatDistance(new Date(createdAt), new Date())}
        </Text>
      </ContentContainer>
    </Container>
  );
}

export default Message;
