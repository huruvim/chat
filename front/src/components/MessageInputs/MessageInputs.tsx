import s from './MessageInputs.module.scss';
import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import React, { FC, useState } from "react";

interface MessageInputsProps {
  handleSendClick: (val: string) => void;
}

const MessageInputs: FC<MessageInputsProps> = ({handleSendClick}) => {
  const [value, setValue] = useState('');

  const onSendClick = () => {
    handleSendClick(value);
    setValue('');
  };

  return (
    <div className={s.messenger}>
      <Textarea value={value} setValue={setValue}/>
      <Button title="Send" onClick={onSendClick} />
    </div>
  )
}

export default MessageInputs;
