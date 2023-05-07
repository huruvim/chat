import s from './MessageInputs.module.scss';
import Button from "../UI/Button/Button";
import React, {FC, useState} from "react";
import Input from "../UI/Input/Input";

interface MessageInputsProps {
  handleSendClick: (val: string, userId: string) => void;
  handleStartTyping: (userId: string) => void;
  handleStopTyping: (userId: string) => void;
  userId: string;
}

const MessageInputs: FC<MessageInputsProps> = ({userId, handleSendClick, handleStartTyping, handleStopTyping}) => {
  const [value, setValue] = useState('');

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

  const handleEnterClick = () => {
    if (value.trim()) {
      onSendClick();
    }
  };

  return (
    <div className={s.messenger}>
      <Input value={value} onChange={handleChange} onEnterClick={handleEnterClick}/>
      <Button title="Send" isDisabled={!value.trim()} onClick={onSendClick}/>
    </div>
  )
}

export default MessageInputs;
