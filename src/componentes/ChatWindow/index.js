import React, { useState, useEffect, useRef } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { IconButton, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import EmojiPicker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
import MessageItem from '../MessageItem';
import Api from '../../Api';
import styles from './styles.module.css';

export default ({ user, data }) => {
  const body = useRef();

  let recognition = null;
  let SpeechRecgonition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecgonition !== undefined) {
    recognition = new SpeechRecgonition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [list, setlist] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setlist([]);
    let unsub = Api.onChatContent(data.chatId, setlist, setUsers);
    return unsub;
  }, [data.chatId]);

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };
      recognition.start();
    }
  };
  const handleSendClick = () => {
    if (text !== '') {
      Api.sendMessage(data, user.id, 'text', text, users);
      setText('');
      setEmojiOpen(false);
    }
  };

  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSendClick();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <img className={styles.avatar} src={data.image} alt='avatar' />
          <div className={styles.name}>{data.title}</div>
        </div>
      </div>
      <div ref={body} className={styles.body}>
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>
      <div
        className={styles.emojiarea}
        style={{ height: emojiOpen ? '200px' : '0px' }}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
          skinTone={SKIN_TONE_NEUTRAL}
          style={{ width: 'auto', background: 'none' }}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.pre}>
          <div
            className={styles.btn}
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}>
            <Tooltip title='Cloes'>
              <IconButton>
                <CloseIcon style={{ color: '#919191' }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className={styles.btn} onClick={handleOpenEmoji}>
            <Tooltip title='Insert Emoji'>
              <IconButton>
                <InsertEmoticonIcon
                  style={{ color: emojiOpen ? '#009688' : '#919191' }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={styles.inputarea}>
          <input
            className={styles.input}
            type='text'
            placeholder='Send a message'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className={styles.pos}>
          {text === '' && (
            <div onClick={handleMicClick} className={styles.btn}>
              <Tooltip title='Send a voice message'>
                <IconButton>
                  <MicIcon
                    style={{ color: listening ? '#126ECE' : '#919191' }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
          {text !== '' && (
            <div onClick={handleSendClick} className={styles.btn}>
              <IconButton>
                <SendIcon style={{ color: '#919191' }} />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
