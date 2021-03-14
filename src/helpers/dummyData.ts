import faker from 'faker';

interface User {
  id: string;
  name: string;
  src?: string;
}

export interface ChatShape extends User {
  messages: MessageShape[];
} 

export interface MessageShape {
  id: string;
  message: string;
  author: User;
  friend: User;
  createdAt: string;
};

const generateChats = (): ChatShape[] => {
  const chats: ChatShape[] = [];

  for (let i = 0; i < 15; i++) {
    const userId = faker.random.uuid();
    const chat: ChatShape = {
      id: userId,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      src: `https://i.pravatar.cc/150?u=${userId}`,
      messages: [],
    };
  
    const randomNumber = faker.random.number();
    const maxMessages = randomNumber > 30 ? 30 : randomNumber;
    for (let j = 0; j < maxMessages; j++) {
      const authorNumber = faker.random.number();
      const isEven = authorNumber % 2 === 0; // get random number to switch between loggedin user and friend
      const message: MessageShape = {
        id: faker.random.uuid(),
        message: faker.lorem.paragraph(),
        author: {
          id: isEven ? chat.id : '1',
          name: isEven ? chat.name : 'John Doe',
          src: isEven ? chat.src : '',
        },
        friend: {
          id: chat.id,
          name: chat.name,
          src: chat.src,
        },
        createdAt: faker.date.past().toISOString(),
      };
  
      chat.messages.push(message);
    }
  
    chat.messages.sort((nextValue, currentValue) => {
      if (nextValue.createdAt < currentValue.createdAt) {
        return -1;
      }
  
      if (nextValue.createdAt > currentValue.createdAt) {
        return 1;
      }
  
      return 0;
    });

    chats.push(chat)
  }

  return chats;
};

const chatData: ChatShape[] = generateChats();

export {
  chatData,
};
