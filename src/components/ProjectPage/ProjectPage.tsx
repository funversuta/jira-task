import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { fetchColumnList, updateLocalStorageColumns } from "../../helpers/api";
import { IColumn, ICard } from "../../interface/interfaces";

import "./ProjectPage.scss";
import { Column } from "../Column/Column";
import Button from "../Button/Button";
import { storageColumnsDefault } from "../../helpers/helper";
import { Input } from "../Input/Input";

interface IProps {
  LocalStorageKeyName: string;
  projectName?: string;
}

export const ProjectPage: FC<IProps> = ({
  LocalStorageKeyName,
  projectName,
}) => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [currentColumn, setCurrentColumn] = useState<IColumn | null>(null);
  const [columns, setColumns] = useState(
    JSON.parse(
      localStorage.getItem(LocalStorageKeyName) ?? storageColumnsDefault
    )
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateLocalStorageColumns(columns, LocalStorageKeyName);
  }, [columns]);

  async function fetchData() {
    const columns: IColumn[] = await fetchColumnList(LocalStorageKeyName);
    setColumns(columns);
  }

  const allCards = columns.reduce((acc: any[], item: { cards: any }) => {
    return acc.push(...item.cards), acc;
  }, []);

  const addCardHandler = (columnId: number, title: string) => {
    const columnIndex = columns.findIndex(
      (item: IColumn) => item.id === columnId
    );
    if (columnIndex < 0) return;

    const tempColumnsList = [...columns];
    const today = new Date().toLocaleDateString();

    let idCalc = false;
    allCards.map((card: ICard) => {
      if (card.id === allCards.length + 1) {
        idCalc = true;
      }
    });

    tempColumnsList[columnIndex].cards.push({
      id: idCalc === false ? allCards.length + 1 : allCards.length + 2,
      title,
      date: today.split(".").reverse().join("-"),
      tasks: [],
      priority: "Normal",
      desc: "",
      start: today,
      files: [],
      comment: [],
      className: "",
    });
    setColumns(tempColumnsList);
  };

  const removeCard = (columnId: number, cardId: number) => {
    const columnIndex = columns.findIndex(
      (item: IColumn) => item.id === columnId
    );
    if (columnIndex < 0) return;

    const tempColumnsList = [...columns];
    const cards = tempColumnsList[columnIndex].cards;

    const cardIndex = cards.findIndex(
      (item: { id: number }) => item.id === cardId
    );
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setColumns(tempColumnsList);
  };

  const updateCard = (columnId: number, cardId: number, card: ICard) => {
    const columnIndex = columns.findIndex(
      (item: { id: number }) => item.id === columnId
    );
    if (columnIndex < 0) return;

    const tempColumnsList = [...columns];
    const cards = tempColumnsList[columnIndex].cards;

    const cardIndex = cards.findIndex(
      (item: { id: number }) => item.id === cardId
    );
    if (cardIndex < 0) return;

    tempColumnsList[columnIndex].cards[cardIndex] = card;

    setColumns(tempColumnsList);
  };

  const onDragStartHandler = (column: IColumn, card: ICard) => {
    setCurrentCard(card);
    setCurrentColumn(column);
  };

  const onDragOver = (e: any) => {
    e.preventDefault();

    if (e?.target?.classname == "card") {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  };

  const onDragLeave = (e: any) => {
    e.target.style.boxShadow = "none";
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    column: IColumn,
    card: ICard
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const currentIndex =
      currentCard != null ? currentColumn!.cards.indexOf(currentCard) : "";
    typeof currentIndex === "number"
      ? currentColumn?.cards.splice(currentIndex, 1)
      : "";

    const dropIndex = column!.cards.indexOf(card);
    currentCard != null
      ? column?.cards.splice(dropIndex + 1, 0, currentCard)
      : null;

    setColumns(
      columns.map((c: IColumn) => {
        if (c.id == column.id) {
          return column;
        }
        if (c.id == currentColumn!.id) {
          return currentColumn;
        }
        return c;
      })
    );
  };

  const dropCardHandler = (
    e: React.DragEvent<HTMLDivElement>,
    column: IColumn
  ) => {
    const currentIndex =
      currentCard != null ? currentColumn!.cards.indexOf(currentCard) : "";
    typeof currentIndex === "number"
      ? currentColumn!.cards.splice(currentIndex, 1)
      : "";

    currentCard != null ? column.cards.push(currentCard) : "";
    setColumns(
      columns.map((c: IColumn) => {
        if (c.id === column.id) {
          return column;
        }
        if (c.id === currentColumn!.id) {
          return currentColumn;
        }
        return c;
      })
    );
  };

  const closeHandler = () => {
    columns.map((c: IColumn) => {
      c.cards.map((card: ICard) => {
        card.className = "";
      });
    });

    setColumns([...columns]);
  };

  const searchHandler = (value: string | number) => {
    columns.map((c: IColumn) => {
      c.cards.map((card: ICard) => {
        card.className = "not-search-target";
        if (card.title === value || card.id == value) card.className = "";
      });
    });

    setColumns([...columns]);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>{projectName}</h1>
      </div>
      <div className="app-head">
        <Button
          children={"Back"}
          className={"wrap"}
          onClick={() => navigate("/")}
        />
        <Input
          placeholder="Search Card"
          editClass="app-search"
          editable
          buttonText="Search"
          onSubmit={(value: string) => searchHandler(value)}
        />
        <Button className={"X"} onClick={() => closeHandler()}>
          Clear search
        </Button>
      </div>
      <div className="app-columns-container">
        <div className="app-columns">
          {columns.map((item: IColumn) => (
            <Column
              key={item.id}
              column={item}
              addCard={addCardHandler}
              removeCard={removeCard}
              onDragStartHandler={onDragStartHandler}
              dropHandler={dropHandler}
              updateCard={updateCard}
              dropCardHandler={dropCardHandler}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
