import {FC} from "react";
import s from './Textarea.module.scss';

interface TextareaProps {
  value: string;
  setValue: (val: string) => void;
}

const Textarea: FC<TextareaProps> = ({value, setValue}) => {
  return (
    <textarea className={s.textarea} value={value} onChange={({target}) => setValue(target.value)}/>
  )
}

export default Textarea;
