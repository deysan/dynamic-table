export type Cell = {
  id: string;
  amount: number;
};

export type Entity = {
  row: number;
  column: number;
  cell: Cell;
};

export type Data = {
  data: Entity[][];
  countX: number;
  loading: boolean;
  handleChangeAmount: (row: number, column: number) => void;
  handleDelete: (row: number) => void;
  handleAddRow: () => void;
  handleSelect: (amount: number, id: string) => void;
  selectedData: string[];
};
