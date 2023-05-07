import {useContext, useEffect, useState} from "react";
import s from './Home.module.scss';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SocketContext} from "../../contexts";
import {User} from "../../shapes";
import {setCurrentUser} from "../../redux/slices/messangerSlice";
import {PATHS} from "../../constants/routes";
import {currentUserSelector} from "../../redux/selectors";

const Home = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const currentUser = useSelector(currentUserSelector);

  const handleRedirectToChat = () => navigate(PATHS.CHAT);

  const handleReceivedUser = (data: User | string) => {
    if (typeof data === 'string') {
      setError(data);
    } else {
      dispatch(setCurrentUser(data));
      handleRedirectToChat();
    }
  }

  useEffect(() => {
    if (currentUser) {
      handleRedirectToChat();
    }
    return () => {
      socket.off('server-set-user', handleReceivedUser);
    }
  }, [currentUser]);

  const onSendTitle = (title: string) => {
    socket.emit('client-set-user', title);
    socket.on('server-set-user', handleReceivedUser);
  };

  const isAllowed = !!title.trim();

  const onEnterClick = () => {
    if (isAllowed) {
      onSendTitle(title)
    }
  }

  return (
    <div className={s.general}>
      <div className={s.menu}>
        <span className={s.title}>Type your name</span>
        {error.length > 0 && <span className={s.error}>{error}</span>}
        <div className={s.input}>
          <Input value={title} onChange={setTitle} placeholder="Robert..." onEnterClick={onEnterClick}/>
        </div>
        <Button title="Send" isDisabled={!isAllowed} onClick={() => onSendTitle(title)}/>
      </div>
    </div>
  );
}

export default Home;
