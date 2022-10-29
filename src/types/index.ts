export type Cell = {
  id: string;
  amount: number;
};

export type Row = Cell[];

export type Table = {
  [key: string]: Row;
};

export type Input = {
  m: number;
  n: number;
  x: number;
};

export type Data = {
  input: Input;
  table: Table;
  columnAverage: number[];
  handleChangeCell: (rowId: string, cellId: string) => void;
  handleDeleteRow: (rowId: string) => void;
  handleAddRow: () => void;
  handleSelectCell: (cellAmount: number, cellId: string) => void;
  selectedCells: string[];
  isCreate: boolean;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  currentCell: {
    amount: number | null;
    id: string | null;
  };
  setCurrentCell: React.Dispatch<
    React.SetStateAction<{
      amount: number | null;
      id: string | null;
    }>
  >;
};

export interface ServerData {
  input: Input;
  table: Table;
}

declare global {
  interface Window {
    __INITIAL_DATA__: ServerData;
  }
}
