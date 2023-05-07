import React, {FC} from 'react';
import s from './Input.module.scss';

interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onEnterClick?: () => void;
}

const Input: FC<InputProps> = ({value, onChange, placeholder = '', onEnterClick = () => null}) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterClick();
    }
  };

  return (
    <input type="text" className={s.input} value={value} placeholder={placeholder} onChange={({target}) => onChange(target.value)} onKeyDown={onKeyDown}/>
  )
}

export default Input;
