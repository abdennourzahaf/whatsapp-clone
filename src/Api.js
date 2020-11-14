const chats = [
  {
    id: 'wzy7m6wBxq5b4Z4WGvcf',
    users: ['KcWKAHym69Qb8FEek9zsnlaY4Gr1', 'I0A9e2J0UETVLGiioEiCLIICMu53'],
    messages: [
      {
        author: 'KcWKAHym69Qb8FEek9zsnlaY4Gr1',
        body: 'Hi',
        date: new Date(),
        type: 'text',
      },
      {
        author: 'I0A9e2J0UETVLGiioEiCLIICMu53',
        body: 'Hello',
        date: new Date(),
        type: 'text',
      },
    ],
  },
  {
    id: 'wzy7m6wBxq5b4Z4WGvcd',
    users: ['KcWKAHym69Qb8FEek9zsnlaY4Gr1', 'I0A9e2J0UETVLGiioEiCLIICMu54'],
    messages: [
      {
        author: 'KcWKAHym69Qb8FEek9zsnlaY4Gr1',
        body: 'Hi',
        date: new Date(),
        type: 'text',
      },
      {
        author: 'I0A9e2J0UETVLGiioEiCLIICMu54',
        body: 'Hi',
        date: new Date(),
        type: 'text',
      },
    ],
  },
];

const userChats = [
  {
    chatId: 'wzy7m6wBxq5b4Z4WGvcd',
    image:
      'https://firstaidertraining.org.uk/wp-content/uploads/2017/09/anon.png',
    lastMessage: chats[1].messages[chats[1].messages.length - 1].body,
    lastMessageDate: new Date(2020, 11, 10, 9, 33, 30, 0),
    title: 'User Name',
    with: 'I0A9e2J0UETVLGiioEiCLIICMu53',
  },
  {
    chatId: 'wzy7m6wBxq5b4Z4WGvcf',
    image:
      'https://firstaidertraining.org.uk/wp-content/uploads/2017/09/anon.png',
    lastMessage: chats[0].messages[chats[0].messages.length - 1].body,
    lastMessageDate: new Date(2020, 11, 10, 10, 35, 30, 0),
    title: 'User Name',
    with: 'I0A9e2J0UETVLGiioEiCLIICMu54',
  },
];

export default {
  onChatList: (userId, setChatList) => {
    userChats.sort((a, b) => {
      if (a.lastMessageDate === undefined) {
        return -1;
      }
      if (b.lastMessageDate === undefined) {
        return -1;
      }
      if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
        return 1;
      } else {
        return -1;
      }
    });

    setChatList(userChats);
  },

  onChatContent: (chatId, setList, setUsers) => {
    const chat = chats.find((c) => c.id === chatId);
    setList(chat.messages);
    setUsers(chat.users);
  },

  sendMessage: async (chatData, userId, type, body, users) => {
    const now = new Date();
    chats
      .find((c) => c.id === chatData.chatId)
      .messages.push({
        type: type,
        author: userId,
        body: body,
        date: now,
      });
  },
};
