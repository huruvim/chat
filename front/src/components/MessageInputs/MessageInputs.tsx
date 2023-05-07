import s from './MessageInputs.module.scss';
import Textarea from "../UI/Textarea/Textarea";
import Button from "../UI/Button/Button";
import React, {FC, useContext, useState} from "react";
import {useSelector} from "react-redux";
import UserTyping from "../UserTyping/UserTyping";
import {SocketContext} from "../../contexts";
import {currentUserSelector} from "../../redux/selectors";

interface MessageInputsProps {
  handleSendClick: (val: string) => void;
}

const MessageInputs: FC<MessageInputsProps> = ({handleSendClick}) => {
  const {socket} = useContext(SocketContext);
  const [value, setValue] = useState('');
  const currentUser = useSelector(currentUserSelector);

  const onSendClick = () => {
    handleSendClick(value);
    setValue('');
    socket?.emit('client-stopped-typing', currentUser?.id);
  };

  const handleChange = (text: string) => {
    setValue(text);
    if (text) {
      socket?.emit('client-started-typing', currentUser?.id);
    } else {
      socket?.emit('client-stopped-typing', currentUser?.id);
    }
  };

  return (
    <>
      <UserTyping />
      <div className={s.messenger}>
        <Textarea value={value} setValue={handleChange}/>
        <Button title="Send" onClick={onSendClick} />
      </div>
    </>
  )
}

export default MessageInputs;
