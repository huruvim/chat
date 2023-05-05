import Message from "../Message/Message";
import s from './MessageList.module.scss';
import {MessageI} from "../Chat/Chat";
import {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

interface MessageListProps {
  messages: MessageI[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  const currentUser = useSelector((state: RootState) => state.messenger.currentUser)
  return (
    <ul className={s.messageList}>
      {messages.map((message) => {
        const isMe = currentUser?.id === message.user.id
        return <Message text={message.text} id={message.id} key={message.id} isMe={isMe} />
      })}
    </ul>
  )
}

export default MessageList;
