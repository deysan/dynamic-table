import { Data, Entity } from '../types';
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
  const [data, setData] = useState<Entity[][]>([]);
  const [countX, setCountX] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const handleChangeAmount = (row: number, column: number) => {
    data[row][column].cell.amount = data[row][column].cell.amount + 1;
    setData((prevState) => [...prevState]);
  };

  const handleDelete = (row: number) => {
    setData((prevState) => prevState.filter((_, index) => index !== row));
  };

  const handleSelect = (amount: number, id: string) => {
    let newData: Entity[] = [];
    newData = newData?.concat.apply(newData, data);

    const sortMin = [
      ...newData
        .filter(({ cell }) => cell.amount <= amount)
        .sort((a, b) => b.cell.amount - a.cell.amount),
    ];

    const sortMax = [
      ...newData
        .filter(({ cell }) => cell.amount >= amount)
        .sort((a, b) => a.cell.amount - b.cell.amount),
    ];

    const selectedCell: Entity[] =
      sortMin.length > sortMax.length
        ? sortMin
            .reduce((acc, entity, i) => {
              acc.push(entity, sortMax[i]);
              return acc;
            }, [] as Entity[])
            .filter((cell) => cell?.cell?.id !== id)
            .slice(0, countX)
        : sortMax
            .reduce((acc, entity, i) => {
              acc.push(entity, sortMin[i]);
              return acc;
            }, [] as Entity[])
            .filter((cell) => cell?.cell?.id !== id)
            .slice(0, countX);

    setSelectedData(selectedCell.map((cell) => cell?.cell?.id));
  };

  const handleAddRow = () => {
    const entities: Entity[] = [];
    for (let j = 0; j < data[0].length; j++) {
      const entity = {
        row: data.length,
        column: j,
        cell: {
          id: uuidv4(),
          amount: getRandomAmount(),
        },
      };
      entities.push(entity);
    }
    data.push(entities);
    setData((prevState) => [...prevState]);
  };

  const createTable = (): Promise<Entity[][]> => {
    const m = getRandomCount();
    const n = getRandomCount();
    const x = getRandomX(m, n);
    const table: Entity[][] = [];

    for (let i = 0; i < m; i++) {
      const entities = [];
      for (let j = 0; j < n; j++) {
        const entity = {
          row: i,
          column: j,
          cell: {
            id: uuidv4(),
            amount: getRandomAmount(),
          },
        };
        entities.push(entity);
      }
      table.push(entities);
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
      .then((response) => setData(response))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        countX,
        loading,
        handleChangeAmount,
        handleDelete,
        handleAddRow,
        handleSelect,
        selectedData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
