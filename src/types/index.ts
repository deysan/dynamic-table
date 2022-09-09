export type Cell = {
  id: string;
  amount: number;
};

export type Row = Cell[];

export type Table = {
  [key: string]: Row;
};

export type Input = {
  m: string;
  n: string;
  x: string;
};

export type Data = {
  table: Table;
  loading: boolean;
  handleChangeCell: (rowId: string, cellId: string) => void;
  handleDeleteRow: (rowId: string) => void;
  handleAddRow: () => void;
  handleSelectCell: (cellAmount: number, cellId: string) => void;
  selectedCell: string[];
  isCreate: boolean;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  input: Input;
  setInput: React.Dispatch<React.SetStateAction<Input>>;
  refreshTable: () => void;
};
