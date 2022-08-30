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

  const createTable = (): Promise<Entity[][]> => {
    const m = getRandomCount();
    const n = getRandomCount();
    const x = getRandomX(m, n);
    const table: Entity[][] = [];

    for (let i = 0; i < m; i++) {
      const entities = [];
      for (let j = 0; j < n; j++) {
        const entity = {
          row: `m${i}`,
          column: `n${j}`,
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
    <DataContext.Provider value={{ data, countX, loading }}>
      {children}
    </DataContext.Provider>
  );
};
