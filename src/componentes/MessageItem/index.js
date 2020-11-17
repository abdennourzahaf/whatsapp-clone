import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default ({ data, user }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.date > 0) {
      let hours = data.date.getHours();
      let minutes = data.date.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <div
      className={styles.line}
      style={{
        justifyContent: user.id === data.author ? 'flex-end' : 'flex-start',
      }}>
      <div
        className={styles.item}
        style={{
          backgroundColor: user.id === data.author ? '#DCF8C6' : '#FFF',
        }}>
        <div className={styles.text}>{data.body}</div>
        <div className={styles.date}>{time}</div>
      </div>
    </div>
  );
};
