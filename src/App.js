import React, { useState, useEffect } from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import ChatListItem from './componentes/ChatListItem';
import ChatIntro from './componentes/ChatIntro';
import ChatWindow from './componentes/ChatWindow';
import Api from './Api';
import './App.css';
import { IconButton, Tooltip } from '@material-ui/core';

const user = {
  id: 'KcWKAHym69Qb8FEek9zsnlaY4Gr1',
  name: 'User Name',
  avatar:
    'https://firstaidertraining.org.uk/wp-content/uploads/2017/09/anon.png',
};

function App() {
  const [chatlist, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});

  useEffect(() => {
    let unsub = Api.onChatList(user.id, setChatList);
    return unsub;
  }, []);

  return (
    <div className='app-window'>
      <div className='sidebar'>
        <header>
          <div className='header--info'>
            <img
              className='header--avatar'
              src='https://firstaidertraining.org.uk/wp-content/uploads/2017/09/anon.png'
              alt='avatar'
            />
            <span className='header--username'>User Name</span>
          </div>
          <div className='header--buttons'>
            <div className='header--btn'>
              <Tooltip title='New Chat'>
                <IconButton aria-label='New chat'>
                  <ChatIcon style={{ color: '#919191' }} />
                </IconButton>
              </Tooltip>
            </div>
            <div className='header--btn'>
              <Tooltip title='Sign out'>
                <IconButton>
                  <ExitToAppIcon
                    aria-label='Sign out'
                    style={{ color: '#919191' }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </header>
        <div className='search'>
          <div className='search--input'>
            <SearchIcon fontSize='small' style={{ color: '#919191' }} />
            <input type='search' placeholder='Search conversations' />
          </div>
        </div>
        <div className='chatlist'>
          {chatlist.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === item.chatId}
              onClick={() => setActiveChat(item)}
            />
          ))}
        </div>
      </div>
      <div className='contentarea'>
        {activeChat.chatId !== undefined && (
          <ChatWindow user={user} data={activeChat} />
        )}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
