import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App';
import ChatProvider from '../context/Chat';
import { chatData } from '../helpers/dummyData';

test('renders page title', () => {
  const { getByTestId } = render(<App />);
  const titleElement = getByTestId('page-title');

  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent('Chats');
});

test('empty chat room content', () => {
  render(<App />);
  const welcomeTitle = screen.getByText(/Chat easily with friends using ChatApp/i);

  expect(welcomeTitle).toBeInTheDocument();
});

test('renders all friends', () => {
  const { getAllByTestId } = render(
    <ChatProvider>
      <App />
    </ChatProvider>
  );
  const friendElement = getAllByTestId('friend');
  const friendName = getAllByTestId('friend-name');

  expect(friendElement).toHaveLength(chatData.length);
  expect(friendName[0]).toHaveTextContent(chatData[0].name);
});

test('it should select a friend and see chat with the friend', () => {
  const { getAllByTestId } = render(
    <ChatProvider>
      <App />
    </ChatProvider>
  );
  const welcomeTitle = screen.getByText(/Chat easily with friends using ChatApp/i);
  const friendElement = getAllByTestId('friend');

  expect(welcomeTitle).toBeInTheDocument();

  fireEvent.click(friendElement[0]);

  expect(welcomeTitle).not.toBeInTheDocument();
});

test('it should see all messages with friend in chat room', async () => {
  const { getAllByTestId } = render(
    <ChatProvider>
      <App />
    </ChatProvider>
  );
  const friendElement = getAllByTestId('friend');
  fireEvent.click(friendElement[0]);

  const messagesElement = getAllByTestId("messages");
  const textMessage = getAllByTestId("message-text");

  expect(messagesElement).toHaveLength(chatData[0].messages.length);
  expect(textMessage[0]).toHaveTextContent(chatData[0].messages[0].message);
});

test('it should send message to friend in chat room', async () => {
  const { getAllByTestId, getByTestId } = render(
    <ChatProvider>
      <App />
    </ChatProvider>
  );
  const friendElement = getAllByTestId('friend');
  fireEvent.click(friendElement[0]);

  const messageInput = getByTestId('message-input');
  fireEvent.change(messageInput, { target: { value: 'Hello world!' } });

  const submitBtn = getByTestId('message-submit');
  fireEvent.click(submitBtn);

  const textMessage = getAllByTestId("message-text");
  const messagesLength = chatData[0].messages.length;

  expect(textMessage[messagesLength]).toHaveTextContent('Hello world!');
});
