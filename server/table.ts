import { Cell, Input, Row, Table } from '../src/types';

import { getRandomAmount } from '../src/utils/randomNumbers';
import { v4 as uuidv4 } from 'uuid';

export const createTable = (inputData: Input) => {
  const table: Table = {};

  Array.from({ length: inputData.m }, () => {
    const row: Row = [];
    const rowId = uuidv4();

    Array.from({ length: inputData.n }, () => {
      const cell: Cell = {
        id: uuidv4(),
        amount: getRandomAmount(),
      };
      row.push(cell);
    });

    table[rowId] = row;
  });

  return table;
};
