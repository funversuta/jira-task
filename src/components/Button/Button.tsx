import { FC } from "react";
import "./Button.scss";

interface IProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className: string;
}

const Button: FC<IProps> = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
