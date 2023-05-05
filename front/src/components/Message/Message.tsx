import {FC} from "react";
import s from './Message.module.scss';
import cn from "classnames";

interface MessageProps {
  text: string;
  id: string;
  isMe: boolean;
}

const Message: FC<MessageProps> = ({text, id, isMe}) => {
  return (
    <li className={cn(s.message, {[s.toRight]: isMe})}>
      <div>{text}</div>
    </li>
  )
}

export default Message;
