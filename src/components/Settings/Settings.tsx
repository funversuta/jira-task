import { FC, ReactNode, useEffect, useRef } from "react";

import "./Settings.scss";

interface IProps {
  onClose?: () => void;
  classValue?: string;
  children: ReactNode;
}

export const Settings: FC<IProps> = ({ classValue, onClose, children }) => {
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleClick = (event: MouseEvent) => {
    if (
      settingsRef &&
      !settingsRef.current?.contains(event.target as Element) &&
      onClose
    )
      onClose();
  };

  return (
    <div
      ref={settingsRef}
      className={`settings ${classValue ? classValue : ""}`}
    >
      {children}
    </div>
  );
};
