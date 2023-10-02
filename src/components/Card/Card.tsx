import { FC, useState } from "react";
import {
  AlignRight,
  MessageCircle,
  CheckSquare,
  Clock,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "react-feather";

import { CardInfo } from "./CardInfo/CardInfo";
import { formatDate } from "../../helpers/helper";
import { ICard, IColumn } from "../../interface/interfaces";
import "./Card.scss";
import { Settings } from "../Settings/Settings";

interface IProps {
  card: ICard;
  column: IColumn;
  removeCard: (columnId: number, cardId: number) => void;
  updateCard: (columnId: number, cardId: number, card: ICard) => void;
  onDragStartHandler: (column: IColumn, card: ICard) => void;
  dropHandler: (
    e: React.DragEvent<HTMLDivElement>,
    column: IColumn,
    card: ICard
  ) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const Card: FC<IProps> = ({
  card,
  column,
  removeCard,
  updateCard,
  onDragStartHandler,
  dropHandler,
  onDragLeave,
}) => {
  const { id, title, desc, priority, date, tasks, comment, className } = card;
  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const date1 = new Date(card.date.split(".").reverse().join("-"));
  const date2 = new Date();

  const diffDate = Math.round(
    (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <>
      <div
        className={`card ${className}`}
        key={card.id}
        draggable
        onDragLeave={(e) => onDragLeave(e)}
        onDragStart={() => onDragStartHandler(column, card)}
        onDrop={(e: React.DragEvent<HTMLDivElement>) =>
          dropHandler(e, column, card)
        }
        onClick={() => setShowModal(true)}
      >
        <div className="card-top">
          <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowSettings(true);
            }}
          >
            <MoreHorizontal />
            {showSettings && (
              <Settings
                classValue="column-settings"
                onClose={() => setShowSettings(false)}
              >
                <p onClick={() => removeCard(column.id, id)}>Delete Card</p>
              </Settings>
            )}
          </div>
        </div>
        <div className="card-title">{title}</div>
        <p title={desc} className="card-desc">
          №: {id} <AlignRight />
        </p>
        <div className="card-priority">
          Priority: {priority === "Normal" && <Minus />}
          {priority === "High" && <ArrowUpRight />}
          {priority === "Low" && <ArrowDownRight />}
        </div>
        <div className="card-footer">
          {date && (
            <p className="card-footer-item">
              <Clock className="card-footer-icon" />
              {formatDate(date)}
            </p>
          )}
          {comment?.length > 0 && (
            <div className="card-footer-comments">
              <MessageCircle /> {comment.length}
            </div>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
        Time in develop: {diffDate} days
      </div>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          columnId={column.id}
          updateCard={updateCard}
        />
      )}
    </>
  );
};
