import { FC, MouseEvent, useState } from "react";
import { X } from "react-feather";

import { IActiveComment } from "./Comments";

interface IProps {
  placeholder?: string;
  onSubmit: (value: IActiveComment, textInput: string) => void;
  activeComment: IActiveComment;
  buttonText?: string;
  setActiveComment: (comment: IActiveComment | null) => void;
}

export const CommentForm: FC<IProps> = ({
  placeholder,
  onSubmit,
  buttonText,
  setActiveComment,
  activeComment,
}) => {
  const [inputText, setInputText] = useState("");

  const handleCancel = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    setActiveComment(null);
    setInputText("");
  };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    onSubmit(activeComment, inputText);
    setActiveComment(null);
    setInputText("");
  };

  return (
    <div className={"custom-input-edit"}>
      <input
        type="text"
        value={inputText}
        placeholder={placeholder}
        onChange={(event) => setInputText(event.target.value)}
        autoFocus
      />
      <div className="custom-input-edit-footer">
        <button onClick={handleClick}>{buttonText || "Add"}</button>
        <X onClick={handleCancel} className="closeIcon" />
      </div>
    </div>
  );
};
