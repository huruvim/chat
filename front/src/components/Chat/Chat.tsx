import s from './Chat.module.scss';
import MessageInputs from "../MessageInputs/MessageInputs";
import MessageList from "../MessageList/MessageList";
import React, {useEffect} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {getMessages} from "../../redux/sagas/messengerSaga";
import {useNavigate} from "react-router-dom";
import {useChat} from "../../hooks/useChat";
import {currentUserSelector, hasTypingUsersSelector, messagesSelector} from "../../redux/selectors";
import {PATHS} from "../../constants/routes";
import UserTyping from "../UserTyping/UserTyping";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messages = useSelector(messagesSelector);
  const user = useSelector(currentUserSelector);
  const hasTypingUsers = useSelector(hasTypingUsersSelector, shallowEqual);

  useEffect(() => {
    if (!user) {
      navigate(PATHS.DEFAULT)
    }
    dispatch(getMessages());
  }, [])

  const {onSendClick, onStartTyping, onStopTyping} = useChat();

  if (!user) {
    return null;
  }

  return (
    <div className={s.general}>
      <div>Welcome to the chat {user?.name}</div>
      <MessageList messages={messages}/>
      {hasTypingUsers && <UserTyping/>}
      <MessageInputs
        handleSendClick={onSendClick}
        handleStartTyping={onStartTyping}
        handleStopTyping={onStopTyping}
        userId={user.id}
      />
    </div>
  )
}

export default Chat;
