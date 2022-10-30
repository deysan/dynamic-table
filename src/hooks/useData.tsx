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
    amount: number | 0;
    id: string | '';
  }>({ amount: 0, id: '' });
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [isSelected, setSelected] = useState(false);

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

  const filterSelectCell = useMemo(() => {
    if (!currentCell.amount && !currentCell.id) return [];

    let rowArray: Row = [];
    rowArray = rowArray?.concat
      .apply(rowArray, Object.values(table))
      .filter((cell) => cell?.id !== currentCell.id);

    const closestArray = rowArray
      .sort(
        (a, b) =>
          Math.abs(currentCell.amount - a.amount) -
          Math.abs(currentCell.amount - b.amount),
      )
      .slice(0, +input.x);

    return closestArray.map((cell) => cell?.id);
  }, [currentCell.amount, currentCell.id]);

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

  useEffect(() => {
    if (currentCell.amount && currentCell.id) {
      setSelectedCells(filterSelectCell);
    }
  }, [filterSelectCell]);

  return (
    <DataContext.Provider
      value={{
        input,
        table,
        columnAverage,
        handleChangeCell,
        handleDeleteRow,
        handleAddRow,
        selectedCells,
        isCreate,
        setCreate,
        currentCell,
        setCurrentCell,
        isSelected,
        setSelected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
