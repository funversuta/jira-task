import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Activity,
  Calendar,
  CheckSquare,
  Layout,
  Trash,
  Type,
  X,
} from "react-feather";

import { Modal } from "../../Modal/Modal";
import { Input } from "../../Input/Input";
import { Comments } from "./Comments/Comments";
import { ICard, IFiles, ITask } from "../../../interface/interfaces";
import "./CardInfo.scss";
import Select from "react-select";
import { SingleValue } from "react-select/dist/declarations/src";

interface IProps {
  onClose: () => void;
  card: ICard;
  columnId: number;
  updateCard: (columnId: number, cardId: number, card: ICard) => void;
}

export const CardInfo: FC<IProps> = ({
  onClose,
  card,
  columnId,
  updateCard,
}) => {
  const [cardNewValues, setCardNewValues] = useState<ICard>({
    ...card,
  });

  useEffect(() => {
    if (updateCard) updateCard(columnId, cardNewValues.id, cardNewValues);
  }, [cardNewValues]);

  const updateTitle = (value: string) => {
    setCardNewValues({ ...cardNewValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardNewValues({ ...cardNewValues, desc: value });
  };

  const addTask = (value: string) => {
    const task: ITask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardNewValues({
      ...cardNewValues,
      tasks: [...cardNewValues.tasks, task],
    });
  };

  const removeTask = (id: number) => {
    const tasks = [...cardNewValues.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setCardNewValues({
      ...cardNewValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...cardNewValues.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardNewValues({
      ...cardNewValues,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!cardNewValues.tasks?.length) return 0;
    const completed = cardNewValues.tasks?.filter(
      (item) => item.completed
    )?.length;
    return (completed / cardNewValues.tasks?.length) * 100;
  };

  const updateDate = (date: string) => {
    if (!date) return;

    setCardNewValues({
      ...cardNewValues,
      date,
    });
  };

  const calculatedPercent = calculatePercent();

  const options = [
    { value: "High", label: "High" },
    { value: "Normal", label: "Normal" },
    { value: "Low", label: "Low" },
  ];

  const priorityHandler = (
    value: SingleValue<{ value: string; label: string }>
  ) => {
    setCardNewValues({
      ...cardNewValues,
      priority: value!.value,
    });
  };

  const filesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = [...cardNewValues.files];

    files.push(e.target.files![0]);
    setCardNewValues({
      ...cardNewValues,
      files: files,
    });
  };

  const download = (file: IFiles) => {
    const url = window.URL.createObjectURL(
      new Blob([file as unknown as BlobPart])
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${file.name}`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <X onClick={onClose} className="closeIcon" />
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <Input
            defaultValue={cardNewValues.title}
            text={cardNewValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
            buttonText="Save"
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Layout />
            <p>Description</p>
          </div>
          <Input
            defaultValue={cardNewValues.desc}
            text={cardNewValues.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
            buttonText="Save"
          />
        </div>
        <div className="cardinfo-row">
          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <Calendar />
              <p>Date</p>
            </div>
            <input
              type="date"
              defaultValue={cardNewValues.date}
              min={new Date().toISOString()}
              onChange={(event) => updateDate(event.target.value)}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title priority">
              <p>
                Choose Priority
                <Activity />
              </p>
              <Select
                options={options}
                placeholder={cardNewValues.priority}
                className="cardinfo-select"
                onChange={(targetValue) => priorityHandler(targetValue)}
              />
            </div>
          </div>
        </div>
        <div className="cardinfo-row">
          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <p>Start</p>
            </div>
            <div>{cardNewValues.start}</div>
          </div>
          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <input
                className="custom-file-input"
                type="file"
                onChange={(e) => filesHandler(e)}
                multiple
              />
            </div>
            {card.files.length > 0 &&
              card.files.map(
                (file) =>
                  file.name && (
                    <div
                      className="cardinfo-file"
                      onClick={() => download(file)}
                    >
                      Download file:
                      <a className="cardinfo-file-link">{file.name}</a>
                    </div>
                  )
              )}
          </div>
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          {cardNewValues.tasks.length > 0 && (
            <div className="cardinfo-box-progress-bar">
              <div
                className="cardinfo-box-progress"
                style={{
                  width: `${calculatedPercent}%`,
                  backgroundColor: calculatedPercent === 100 ? "limegreen" : "",
                }}
              />
            </div>
          )}
          <div className="cardinfo-box-task-list">
            {cardNewValues.tasks?.map((item) => (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <Input
            text={"Create a Task"}
            placeholder="Enter task name"
            onSubmit={addTask}
            displayClass="taskButton"
          />
          <div className="cardinfo-comment">
            <Comments card={card} setCardNewValues={setCardNewValues} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
