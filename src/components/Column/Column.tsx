import { FC } from "react";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { IColumn, ICard } from "../../interface/interfaces";
import "./Column.scss";

interface IProps {
  column: IColumn;
  addCard: (columnId: number, title: string) => void;
  removeCard: (columnId: number, cardId: number) => void;
  updateCard: (columnId: number, cardId: number, card: ICard) => void;
  dropCardHandler: (
    e: React.DragEvent<HTMLDivElement>,
    column: IColumn
  ) => void;
  onDragStartHandler: (column: IColumn, card: ICard) => void;
  dropHandler: (
    e: React.DragEvent<HTMLDivElement>,
    column: IColumn,
    card: ICard
  ) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, column: IColumn) => void;
}

export const Column: FC<IProps> = ({
  column,
  addCard,
  removeCard,
  updateCard,
  onDragStartHandler,
  dropCardHandler,
  dropHandler,
  onDragLeave,
  onDragOver,
}) => {
  return (
    <div
      className="column"
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        dropCardHandler(e, column);
      }}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        onDragOver(e, column);
      }}
    >
      <div className="column-inner" key={column?.id}>
        <div className="column-header">
          <p className="column-header-title">
            {column?.title}
            <span>{column?.cards?.length || 0}</span>
          </p>
          <div className="column-header-title-more"></div>
        </div>
        <div className="column-cards ">
          {column?.cards.map((item) => (
            <Card
              key={item.id}
              card={item}
              column={column}
              removeCard={removeCard}
              updateCard={updateCard}
              onDragStartHandler={onDragStartHandler}
              dropHandler={dropHandler}
              onDragLeave={onDragLeave}
            />
          ))}

          <Input
            text="Add Card"
            placeholder="Enter Card Title"
            displayClass="column-add-card"
            editClass="column-add-card-edit"
            onSubmit={(value: string) => addCard(column?.id, value)}
          />
        </div>
      </div>
    </div>
  );
};
