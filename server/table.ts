import { Cell, Input, Row, Table } from '../src/types';

import { getRandomAmount } from '../src/utils/randomNumbers';
import { v4 as uuidv4 } from 'uuid';

export const createTable = (inputData: Input) => {
  const table: Table = {};

  for (let i = 0; i < inputData.m; i++) {
    const row: Row = [];
    const rowId = uuidv4();

    for (let j = 0; j < inputData.n; j++) {
      const cell: Cell = {
        id: uuidv4(),
        amount: getRandomAmount(),
      };
      row.push(cell);
    }
    table[rowId] = row;
  }

  return table;
};
