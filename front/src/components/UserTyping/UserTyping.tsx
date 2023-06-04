import s from './UserTyping.module.scss';
import {useSelector} from "react-redux";
import {memo} from "react";
import {compareTypingUsers, typingUsersSelector} from "../../redux/selectors";

const UserTyping = () => {
  const usersTyping = useSelector(typingUsersSelector, compareTypingUsers);
  return (
    <div className={s.typing}>
      {usersTyping.slice(0, 3).map((user) => <span className={s.user}>{user.name} is typing...</span>)}
      {usersTyping.length > 3 && <span>+{usersTyping.length - 3}...</span>}
    </div>
  )
}

export default memo(UserTyping);
