export type Cell = {
  id: string;
  amount: number;
};

export type Entity = {
  row: string;
  column: string;
  cell: Cell;
};

export type Data = {
  data: Entity[][];
  countX: number;
  loading: boolean;
};
