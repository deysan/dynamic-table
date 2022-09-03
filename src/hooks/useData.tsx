import { Cell, Data, Row, Table } from '../types';
import React, { useContext, useEffect, useState } from 'react';
import {
  getRandomAmount,
  getRandomCount,
  getRandomX,
} from '../utils/randomNumbers';

import { v4 as uuidv4 } from 'uuid';

const DataContext = React.createContext<Data>(null!);

export const useData = () => {
  return useContext(DataContext);
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [table, setTable] = useState<Table>({});
  const [countX, setCountX] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string[]>([]);

  const handleChangeCell = (rowId: string, cellId: string) => {
    const changedTable: Table = { ...table };
    const cellIndex = changedTable[rowId].findIndex(({ id }) => id === cellId);
    changedTable[rowId][cellIndex].amount += 1;
    setTable(changedTable);
  };

  const handleDeleteRow = (rowId: string) => {
    const changedTable: Table = { ...table };
    delete changedTable[rowId];
    setTable(changedTable);
  };

  const handleSelectCell = (cellAmount: number, cellId: string) => {
    let rowArray: Row = [];
    rowArray = rowArray?.concat.apply(rowArray, Object.values(table));

    const sortMin = [
      ...rowArray
        .filter((cell) => cell.amount <= cellAmount)
        .sort((a, b) => b.amount - a.amount),
    ];

    const sortMax = [
      ...rowArray
        .filter((cell) => cell.amount >= cellAmount)
        .sort((a, b) => a.amount - b.amount),
    ];

    const selectedCell: Row =
      sortMin.length > sortMax.length
        ? sortMin
            .reduce((acc, entity, i) => {
              acc.push(entity, sortMax[i]);
              return acc;
            }, [] as Row)
            .filter((cell) => cell?.id !== cellId)
            .slice(0, countX)
        : sortMax
            .reduce((acc, entity, i) => {
              acc.push(entity, sortMin[i]);
              return acc;
            }, [] as Row)
            .filter((cell) => cell?.id !== cellId)
            .slice(0, countX);

    setSelectedCell(selectedCell.map((cell) => cell?.id));
  };

  const handleAddRow = () => {
    const changedTable: Table = { ...table };
    const row: Row = [];
    const rowId = uuidv4();

    for (let j = 0; j < Object.values(table)[0].length; j++) {
      const cell: Cell = {
        id: uuidv4(),
        amount: getRandomAmount(),
      };
      row.push(cell);
    }

    changedTable[rowId] = row;
    setTable(changedTable);
  };

  const createTable = (): Promise<Table> => {
    const m = getRandomCount();
    const n = getRandomCount();
    const x = getRandomX(m, n);
    const table: Table = {};

    for (let i = 0; i < m; i++) {
      const row: Row = [];
      const rowId = uuidv4();

      for (let j = 0; j < n; j++) {
        const cell: Cell = {
          id: uuidv4(),
          amount: getRandomAmount(),
        };
        row.push(cell);
      }
      table[rowId] = row;
    }

    setCountX(x);

    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(table);
      }, 2000);
    });
  };

  useEffect(() => {
    setLoading(true);
    createTable()
      .then((response) => setTable(response))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider
      value={{
        table,
        countX,
        loading,
        handleChangeCell,
        handleDeleteRow,
        handleAddRow,
        handleSelectCell,
        selectedCell,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
