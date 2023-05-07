import React, {FC} from "react";
import s from './Button.module.scss';

interface ButtonProps {
  title: string;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({title, onClick, isDisabled = false}) => {
  return <button disabled={isDisabled} className={s.button} onClick={onClick}>{title}</button>
}

export default Button;
