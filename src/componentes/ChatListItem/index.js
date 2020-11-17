import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

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
    <div
      className={`${styles.item} ${active && styles.active}`}
      onClick={onClick}>
      <img className={styles.avatar} src={data.image} alt='' />
      <div className={styles.lines}>
        <div className={styles.line}>
          <div className={styles.name}>{data.title}</div>
          <div className={styles.date}>{time}</div>
        </div>
        <div className={styles.line}>
          <div className={styles.lastmsg}>
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
