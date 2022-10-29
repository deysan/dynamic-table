import { Cell, Data, Input, Row, ServerData, Table } from '../types';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
  const [input] = useState<Input>(data?.input || {});
  const [table, setTable] = useState<Table>(data?.table || {});
  const [currentCell, setCurrentCell] = useState<{
    amount: number | null;
    id: string | null;
  }>({ amount: null, id: null });
  const [selectedCells, setSelectedCells] = useState<string[]>([]);

  const columnAverage = useMemo(() => {
    const columnAverageArray = [];

    for (let i = 0; i < Object.values(table)?.[0]?.length; i++) {
      let average = 0;

      for (let j = 0; j < Object.keys(table)?.length; j++) {
        average += Object.values(table)[j][i].amount;
      }

      columnAverageArray.push(Math.round(average / Object.keys(table)?.length));
    }
    return columnAverageArray;
  }, [table]);

  const handleChangeCell = useCallback((rowId: string, cellId: string) => {
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
  }, []);

  const handleDeleteRow = useCallback((rowId: string) => {
    setTable((prevState) => {
      const changedTable: Table = { ...prevState };
      delete changedTable[rowId];

      return changedTable;
    });
  }, []);

  const handleAddRow = useCallback(() => {
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
  }, []);

  const handleSelectCell = useCallback((cellAmount: number, cellId: string) => {
    let rowArray: Row = [];
    rowArray = rowArray?.concat
      .apply(rowArray, Object.values(table))
      .filter((cell) => cell?.id !== cellId);

    const closestArray = rowArray
      .sort(
        (a, b) =>
          Math.abs(cellAmount - a.amount) - Math.abs(cellAmount - b.amount),
      )
      .slice(0, +input.x);

    setSelectedCells(closestArray.map((cell) => cell?.id));
  }, []);

  useEffect(() => {
    if (currentCell.amount && currentCell.id) {
      handleSelectCell(currentCell.amount, currentCell.id);
    }
  }, [currentCell.id]);

  return (
    <DataContext.Provider
      value={{
        input,
        table,
        columnAverage,
        handleSelectCell,
        handleChangeCell,
        handleDeleteRow,
        handleAddRow,
        selectedCells,
        isCreate,
        setCreate,
        currentCell,
        setCurrentCell,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
