import {useState} from "react";
import s from './Home.module.scss';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/sagas/messengerSaga";

const Home = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSendTitle = (title: string) => {
    dispatch(setUser({
      title, onSuccess: () => {
        navigate('/chat')
      }
    }));
  };

  const isAllowed = !!title.trim();

  return (
    <div className={s.general}>
      <div className={s.menu}>
        <span className={s.title}>Type your name</span>
        <Input value={title} onChange={setTitle} placeholder="Robert..."/>
        <Button title="Send" isDisabled={!isAllowed} onClick={() => onSendTitle(title)}/>
      </div>
    </div>
  );
}

export default Home;
