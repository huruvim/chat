import s from './Chat.module.scss';
import MessageInputs from "../MessageInputs/MessageInputs";
import MessageList from "../MessageList/MessageList";
import {useCallback, useContext, useEffect} from "react";
import {SocketContext} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getMessages, sendMessage} from "../../redux/sagas/messengerSaga";
import {addNewMessage} from "../../redux/slices/messangerSlice";
import {useNavigate} from "react-router-dom";

export interface User {
  id: string;
  name: string;
}

export interface MessageI {
  id: string;
  text: string;
  user: User;
}

export interface User {
  name: string;
  id: string;
}

const useChat = () => {
  const {socket} = useContext(SocketContext);
  const dispatch = useDispatch();

  const onGetNewMessage = useCallback((value: MessageI) => {
    console.log('received!!!', value);
    dispatch(addNewMessage(value));
  }, [dispatch]);

  useEffect(() => {
    socket?.on('server-message-received', onGetNewMessage)
    return () => {
      socket?.off('server-message-received', onGetNewMessage)
    }
  },[socket, onGetNewMessage])
};

const Chat = () => {
  const {socket} = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector((state: RootState) => state.messenger.messages);
  const user = useSelector((state: RootState) => state.messenger.currentUser);

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
