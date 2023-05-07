import {FC} from "react";
import s from './Message.module.scss';
import cn from "classnames";

interface MessageProps {
  text: string;
  id: string;
  isMe: boolean;
  authorName: string;
  showAuthor: boolean;
}

const Message: FC<MessageProps> = ({text, authorName, isMe, showAuthor}) => {
  return (
    <li className={cn(s.message, {[s.myMessage]: isMe})}>
      <div className={cn(s.messageContainer, {[s.alignedMessage]: isMe})}>
        <span>{text}</span>
      </div>
      {showAuthor && <span className={cn(s.author, {[s.alignedAuthorMessage]: isMe})}>{authorName}</span>}
    </li>
  )
}

export default Message;
