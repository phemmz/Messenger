import { createContext, useState } from 'react';
import faker from 'faker';

import { chatData, ChatShape } from '../helpers/dummyData';

interface NewChat {
  message: string;
  authorId: string;
  friendId: string;
};

interface DefaultContext {
  sendChat: (newChat: NewChat) => void;
  chats: ChatShape[];
}

interface Props {
  children: JSX.Element;
};

const defaultValue = {
  sendChat: () => {},
  chats: [],
};

export const ChatContext = createContext<DefaultContext>(defaultValue);

function ChatProvider({ children }: Props): JSX.Element {
  const [chats, setChats] = useState<ChatShape[]>(chatData);

  const sendChat = ({ message, authorId, friendId }: NewChat): void => {
    const updatedChat = chats.map((currentChat: ChatShape): ChatShape => {
      if (currentChat.id === friendId) {
        return {
          ...currentChat,
          messages: [
            ...currentChat.messages,
            {
              id: faker.random.uuid(),
              author: {
                id: authorId,
                name: 'John Doe',
                src: '',
              },
              friend: {
                id: currentChat.id,
                name: currentChat.name,
                src: currentChat.src,
              },
              message,
              createdAt: new Date().toISOString(),
            }
          ]
        }
      }

      return currentChat;
    });

    setChats(updatedChat);
  };

  return (
    <ChatContext.Provider value={{ sendChat, chats }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
