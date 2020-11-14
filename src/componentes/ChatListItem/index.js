import React, { useState, useEffect } from 'react';
import './styles.css';

export default ({ onClick, active, data }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.lastMessageDate > 0) {
      let hours = data.lastMessageDate.getHours();
      let minutes = data.lastMessageDate.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
      <img className='chatListItem--avatar' src={data.image} alt='' />
      <div className='chatListItem-lines'>
        <div className='chatListItem-line'>
          <div className='chatListItem--name'>{data.title}</div>
          <div className='chatListItem--date'>{time}</div>
        </div>
        <div className='chatListItem-line'>
          <div className='chatListItem--lastmsg'>
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
