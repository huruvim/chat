import s from './Chat.module.scss';
import MessageInputs from "../MessageInputs/MessageInputs";
import MessageList from "../MessageList/MessageList";
import {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMessages} from "../../redux/sagas/messengerSaga";
import {useNavigate} from "react-router-dom";
import {useChat} from "../../hooks/useChat";
import {SocketContext} from "../../contexts";
import {currentUserSelector, messagesSelector} from "../../redux/selectors";

const Chat = () => {
  const {socket} = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector(messagesSelector);
  const user = useSelector(currentUserSelector);

  useEffect(() => {
    dispatch(getMessages());
  }, [])

  useChat();

  const onSendClick = (value: string) => {
    socket?.emit('client-message-sent', JSON.stringify({text: value, userId: user?.id}))
  }

  if (!user) {
    navigate('/')
  }

  return (
    <div className={s.general}>
      <div className={s.chat}>
        <MessageList messages={messages}/>
        <MessageInputs handleSendClick={onSendClick}/>
      </div>
    </div>
  )
}

export default Chat;
