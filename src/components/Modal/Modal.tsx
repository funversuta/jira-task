import { FC, ReactNode } from "react";

import "./Modal.scss";

interface IProps {
  onClose?: () => void;
  children: ReactNode;
}

export const Modal: FC<IProps> = ({ onClose, children }) => {
  return (
    <section className="modal" onClick={() => (onClose ? onClose() : "")}>
      <div
        className="modal-content "
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};
