import React, { useMemo } from 'react';

import { Loader } from '../components/Loader';
import { TableRow } from '../components/TableRow';
import { useData } from '../hooks/useData';

export const Table: React.FC = () => {
  const { data, loading } = useData();

  if (loading) return <Loader />;

  const cellAmount = useMemo(() => {
    const cellAmountArray = [];

    for (let i = 0; i < data.length; i++) {
      const amount = Math.round(
        data
          .map((row) => row[i].cell.amount)
          .reduce((acc, value) => acc + value, 0) / data.length,
      );
      cellAmountArray.push(amount);
    }
    cellAmountArray.push(0);

    return cellAmountArray;
  }, [data]);

  return (
    <div className="table">
      {data.map((row, index) => (
        <div className="row" key={index}>
          <TableRow entities={row} />
        </div>
      ))}
      <div className="row">
        {cellAmount.map((cell, index) => (
          <div className="cell" key={`${index}-${cell}`}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};
