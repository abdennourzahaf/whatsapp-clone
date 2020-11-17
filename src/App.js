import React, { useState, useEffect } from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    let unsub = Api.onChatList(user.id, setChatList);
    setActiveChat(chatlist[0]);
    return unsub;
  }, [chatlist]);

  return (
    <div className='app-window'>
      <div className={`sidebar ${sidebarIsOpen && 'open'}`}>
        <header>
          <div className='header--info'>
            <img className='header--avatar' src={user.avatar} alt='avatar' />
            <span className='header--more'>
              <IconButton aria-label='More'>
                <ArrowForwardIosIcon
                  style={{
                    color: '#919191',
                    transform: sidebarIsOpen ? 'rotate(180deg)' : 'none',
                  }}
                  onClick={() => setSidebarIsOpen((pre) => !pre)}
                />
              </IconButton>
            </span>
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
        <div className='sidebar-hidden'>
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
                active={activeChat?.chatId === item.chatId}
                onClick={() => {
                  setActiveChat(item);
                  setSidebarIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='contentarea'>
        {activeChat?.chatId !== undefined && (
          <ChatWindow user={user} data={activeChat} />
        )}
        {activeChat?.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
