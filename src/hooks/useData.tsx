import { Cell, Data, Input, Row, Table } from '../types';
import React, { useContext, useEffect, useState } from 'react';

import { getRandomAmount } from '../utils/randomNumbers';
import { v4 as uuidv4 } from 'uuid';

const DataContext = React.createContext<Data>(null!);

export const useData = () => {
  return useContext(DataContext);
};

interface DataProviderProps {
  children: React.ReactNode;
  setOpenTable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataProvider: React.FC<DataProviderProps> = ({
  children,
  setOpenTable,
}) => {
  const [isCreate, setCreate] = useState(false);
  const [input, setInput] = useState<Input>({ m: 5, n: 10, x: 3 });
  const [table, setTable] = useState<Table>({});
  const [loading, setLoading] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string[]>([]);

  const handleChangeCell = (rowId: string, cellId: string) => {
    setTable((prevState) => {
      const changedTable: Table = JSON.parse(JSON.stringify(prevState));
      const cellIndex = changedTable[rowId].findIndex(
        ({ id }) => id === cellId,
      );
      changedTable[rowId][cellIndex].amount += 1;

      return { ...prevState, ...changedTable };
    });
  };

  const handleDeleteRow = (rowId: string) => {
    setTable((prevState) => {
      const changedTable: Table = JSON.parse(JSON.stringify(prevState));
      delete changedTable[rowId];

      return { ...changedTable };
    });
  };

  const handleAddRow = () => {
    const row: Row = [];
    const rowId = uuidv4();

    for (let j = 0; j < Object.values(table)[0].length; j++) {
      const cell: Cell = {
        id: uuidv4(),
        amount: getRandomAmount(),
      };
      row.push(cell);
    }

    setTable((prevState) => ({ ...prevState, [rowId]: row }));
  };

  const handleSelectCell = (cellAmount: number, cellId: string) => {
    let rowArray: Row = [];
    rowArray = rowArray?.concat
      .apply(rowArray, Object.values(table))
      .filter((cell) => cell?.id !== cellId);

    const closestArray = rowArray
      .sort(
        (a, b) =>
          Math.abs(cellAmount - a.amount) - Math.abs(cellAmount - b.amount),
      )
      .slice(0, input.x);

    setSelectedCell(closestArray.map((cell) => cell?.id));
  };

  const refreshTable = () => {
    setOpenTable(false);
    setCreate(false);
    setTable({});
  };

  const createTable = (): Promise<Table> => {
    const table: Table = {};

    for (let i = 0; i < input.m; i++) {
      const row: Row = [];
      const rowId = uuidv4();

      for (let j = 0; j < input.n; j++) {
        const cell: Cell = {
          id: uuidv4(),
          amount: getRandomAmount(),
        };
        row.push(cell);
      }
      table[rowId] = row;
    }

    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(table);
      }, 1000);
    });
  };

  useEffect(() => {
    if (isCreate) {
      setLoading(true);
      createTable()
        .then((response) => setTable(response))
        .finally(() => setLoading(false));
    }
  }, [isCreate]);

  return (
    <DataContext.Provider
      value={{
        table,
        loading,
        handleChangeCell,
        handleDeleteRow,
        handleAddRow,
        handleSelectCell,
        selectedCell,
        isCreate,
        setCreate,
        input,
        setInput,
        refreshTable,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
