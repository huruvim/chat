import Message from "../Message/Message";
import s from './MessageList.module.scss';
import {FC, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {MessageI, Nullable} from "../../shapes";
import {currentUserSelector} from "../../redux/selectors";

interface MessageListProps {
  messages: MessageI[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  const currentUser = useSelector(currentUserSelector)
  const messagesRef = useRef<Nullable<HTMLUListElement>>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current?.scrollHeight);
  }, [messages]);

  return (
    <ul className={s.messageList} ref={messagesRef}>
      {messages.map((message, idx, arr) => {
        const isMe = currentUser?.id === message.user.id
        const nextMessage = arr[idx + 1];
        const currentMessage = arr[idx];
        const shouldShowAuthor = currentMessage.user.id !== nextMessage?.user?.id;
        return <Message text={message.text} id={message.id} key={message.id} isMe={isMe} authorName={message.user.name} showAuthor={shouldShowAuthor}/>
      })}
    </ul>
  )
}

export default MessageList;
