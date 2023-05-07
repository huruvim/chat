import s from './MessageInputs.module.scss';
import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import React, {FC, useRef, useState} from "react";
import UserTyping from "../UserTyping/UserTyping";

interface MessageInputsProps {
  handleSendClick: (val: string, userId: string) => void;
  handleStartTyping: (userId: string) => void;
  handleStopTyping: (userId: string) => void;
  userId: string;
}

const MessageInputs: FC<MessageInputsProps> = ({userId, handleSendClick, handleStartTyping, handleStopTyping}) => {
  const [value, setValue] = useState('')

  const onSendClick = () => {
    handleSendClick(value, userId);
    handleStopTyping(userId);
    setValue('');
  };

  const handleChange = (text: string) => {
    setValue(text);
    if (text) {
      handleStartTyping(userId);
    } else {
      handleStopTyping(userId);
    }
  };

  return (
    <>
      <UserTyping/>
      <div className={s.messenger}>
        <Textarea handleChange={handleChange} value={value}/>
        <Button title="Send" onClick={onSendClick}/>
      </div>
    </>
  )
}

export default MessageInputs;
