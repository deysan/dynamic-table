export type Cell = {
  id: string;
  amount: number;
};

export type Row = Cell[];

export type Table = {
  [key: string]: Row;
};

export type Data = {
  table: Table;
  countX: number;
  loading: boolean;
  handleChangeCell: (rowId: string, cellId: string) => void;
  handleDeleteRow: (rowId: string) => void;
  handleAddRow: () => void;
  handleSelectCell: (cellAmount: number, cellId: string) => void;
  selectedCell: string[];
};
