import styled from 'styled-components';

import { Heading, Text, FlexContainer } from './StyleComponents';
import { ReactComponent as AppLogo } from '../assets/dove.svg';

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function EmptyChatRoom(): JSX.Element {
  return (
    <Container >
      <div>
        <FlexContainer alignItems="center">
          <Heading>ChatApp</Heading>
          <AppLogo />
        </FlexContainer>
        <Text margin="1.5rem 0 0 0">Chat easily with friends using ChatApp</Text>
      </div>
    </Container>
  );
}

export default EmptyChatRoom;
