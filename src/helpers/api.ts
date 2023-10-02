import { IColumn } from "../interface/interfaces";
import { storageColumnsDefault } from "./helper";

export class ColumnAPI {
  async fetchColumnList(LocalStorageKeyName: string): Promise<IColumn[]> {
    let ColumnList: IColumn[] = [];

    localStorage.getItem(LocalStorageKeyName);
    const localStorageData: IColumn[] = JSON.parse(
      localStorage.getItem(LocalStorageKeyName) ?? ""
    );
    ColumnList = [...localStorageData];
    ColumnList.length == 0
      ? (ColumnList = [...JSON.parse(storageColumnsDefault)])
      : ColumnList;

    return ColumnList;
  }
}

export async function fetchColumnList(
  LocalStorageKeyName: string
): Promise<IColumn[]> {
  const api = new ColumnAPI();
  return api.fetchColumnList(LocalStorageKeyName);
}

export function updateLocalStorageColumns(
  Columns: IColumn[],
  LocalStorageKeyName: string
) {
  localStorage.setItem(LocalStorageKeyName, JSON.stringify(Columns));
}

export function updateLocalStorageKeyName(
  LocalStorageKeyName: string,
  newLocalStorageKeyName: string
) {
  let ColumnList: IColumn[] = [];

  if (localStorage.getItem(LocalStorageKeyName)) {
    const localStorageData: IColumn[] = JSON.parse(
      localStorage.getItem(LocalStorageKeyName) ?? ""
    );
    ColumnList = [...localStorageData];

    localStorage.setItem(newLocalStorageKeyName, JSON.stringify(ColumnList));
  }
}
