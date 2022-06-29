export interface TodoItem {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: number;
  due_date: string | null;
}

export type SortType = "due_date" | "priority" | "title";
export type SortState = "asc" | "desc" | "off";
export type Sorter = {
  name: string;
  type: SortType;
  state: SortState;
};
