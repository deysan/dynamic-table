import { Cell, Data, Input, Row, ServerData, Table } from '../types';
import React, { useContext, useState } from 'react';

import { getRandomAmount } from '../utils/randomNumbers';
import { v4 as uuidv4 } from 'uuid';

const DataContext = React.createContext<Data>(null!);

export const useData = () => {
  return useContext(DataContext);
};

interface DataProviderProps {
  children: React.ReactNode;
  data: ServerData;
}

export function DataProvider({ children, data }: DataProviderProps) {
  const [isCreate, setCreate] = useState(false);
  const [input, setInput] = useState<Input>({ m: 5, n: 10, x: 3 });
  const [table, setTable] = useState<Table>(data?.table || {});
  const [selectedCell, setSelectedCell] = useState<string[]>([]);

  const handleChangeCell = (rowId: string, cellId: string) => {
    setTable((prevState) => {
      return {
        ...prevState,
        [rowId]: prevState[rowId].map((cell, index) => {
          if (cell.id === cellId) {
            return {
              ...cell,
              amount: prevState[rowId][index].amount + 1,
            };
          }
          return cell;
        }),
      };
    });
  };

  const handleDeleteRow = (rowId: string) => {
    setTable((prevState) => {
      const changedTable: Table = { ...prevState };
      delete changedTable[rowId];

      return changedTable;
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
      .slice(0, +data.input.x);

    setSelectedCell(closestArray.map((cell) => cell?.id));
  };

  return (
    <DataContext.Provider
      value={{
        table,
        handleChangeCell,
        handleDeleteRow,
        handleAddRow,
        handleSelectCell,
        selectedCell,
        isCreate,
        setCreate,
        input,
        setInput,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
