import s from './Chat.module.scss';
import MessageInputs from "../MessageInputs/MessageInputs";
import MessageList from "../MessageList/MessageList";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMessages} from "../../redux/sagas/messengerSaga";
import {useNavigate} from "react-router-dom";
import {useChat} from "../../hooks/useChat";
import {currentUserSelector, messagesSelector} from "../../redux/selectors";
import {PATHS} from "../../constants/routes";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messages = useSelector(messagesSelector);
  const user = useSelector(currentUserSelector);

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
      <div className={s.chat}>
        <MessageList messages={messages}/>
        <MessageInputs
          handleSendClick={onSendClick}
          handleStartTyping={onStartTyping}
          handleStopTyping={onStopTyping}
          userId={user.id}
        />
      </div>
    </div>
  )
}

export default Chat;
