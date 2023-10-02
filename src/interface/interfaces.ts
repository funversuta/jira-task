export interface ILabel {
  color: string;
  text: string;
}

export interface ITask {
  id: number;
  completed: boolean;
  text: string;
}

export interface IComment {
  id: number;
  body: string;
  user: string;
  userId: number;
  parentId: number | null;
  createdAt: string;
}
export interface ICard {
  className: string;
  id: number;
  title: string;
  date: string;
  start: string;
  priority: string;
  tasks: ITask[];
  comment: IComment[];
  desc?: string;
  files: IFiles[];
}

export interface IColumn {
  id: number;
  title: string;
  cards: ICard[];
}

export interface IFiles {
  type: string;
  name: string;
  size: number;
}

export interface IProject {
  id: number;
  name: string;
}
