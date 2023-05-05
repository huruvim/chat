import React, {FC, useState} from 'react';
import s from './Input.module.scss';

interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({value, onChange, placeholder = ''}) => {
  return (
    <input type="text" className={s.input} value={value} placeholder={placeholder} onChange={({target}) => onChange(target.value)}/>
  )
}

export default Input;
