import {useCallback, useContext, useEffect} from "react";
import {useDispatch} from "react-redux";
import {addNewMessage, removeTypingUser, setTypingUser} from "../redux/slices/messangerSlice";
import {SocketContext} from "../contexts";
import {MessageI, User} from "../shapes";

export const useChat = () => {
  const {socket} = useContext(SocketContext);
  const dispatch = useDispatch();

  const onGetNewMessage = useCallback((value: MessageI) => {
    dispatch(addNewMessage(value));
  }, [dispatch]);

  const onUserTyping = useCallback((user: User) => {
    dispatch(setTypingUser(user));
  }, [dispatch]);

  const onUserStoppedTyping = useCallback((userId: string) => {
    dispatch(removeTypingUser(userId));
  }, [dispatch]);

  const onSendClick = useCallback((text: string, userId: string) => {
    socket.emit('client-message-sent', JSON.stringify({text, userId}))
  }, [socket]);

  const onStartTyping = useCallback((userId: string) => {
    socket.emit('client-started-typing', userId);
  }, [socket]);

  const onStopTyping = useCallback((userId: string) => {
    socket.emit('client-stopped-typing', userId);
  }, [socket])

  useEffect(() => {
    socket.on('server-message-received', onGetNewMessage)
    socket.on('server-user-typing', onUserTyping)
    socket.on('server-user-stopped-typing', onUserStoppedTyping)
    return () => {
      socket.off('server-message-received', onGetNewMessage)
      socket.off('server-user-typing', onUserTyping)
      socket.off('server-user-stopped-typing', onUserStoppedTyping)
    }
  },[socket, onGetNewMessage])

  return { onSendClick, onStartTyping, onStopTyping };
};