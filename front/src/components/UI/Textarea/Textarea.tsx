import {FC, useState} from "react";
import s from './Textarea.module.scss';

interface TextareaProps {
  value: string;
  handleChange: (val: string) => void;
}

const Textarea: FC<TextareaProps> = ({value, handleChange}) => {
  const handleChangeValue = (text: string) => {
    handleChange(text);
  };

  return (
    <textarea className={s.textarea} value={value} onChange={({target}) => handleChangeValue(target.value)}/>
  )
}

export default Textarea;
