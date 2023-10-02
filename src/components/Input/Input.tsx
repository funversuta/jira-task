import { FC, FormEvent, useState } from "react";
import { X } from "react-feather";

import "./Input.scss";

interface IProps {
  text?: string;
  onSubmit: (value: string) => void;
  displayClass?: string;
  editClass?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
  commentSubmit?: (text: string, parentId?: number | null) => void;
  parentId?: number | null;
  editable?: boolean;
  setEditable?: React.Dispatch<React.SetStateAction<number | null>>;
}
export const Input: FC<IProps> = ({
  text,
  onSubmit,
  displayClass,
  editClass,
  placeholder,
  defaultValue,
  buttonText,
  commentSubmit,
  parentId,
  editable,
  setEditable,
}) => {
  const [isInput, setIsInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
      if (commentSubmit) commentSubmit(inputText, parentId);
    }
    setIsInput(false);
  };

  const closeHandler = () => {
    setIsInput(false);
    setEditable!(null);
  };

  return (
    <div className="custom-input">
      {isInput || editable ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="custom-input-edit-footer">
            <button type="submit">{buttonText || "Add"}</button>
            <X onClick={() => closeHandler()} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsInput(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
};
