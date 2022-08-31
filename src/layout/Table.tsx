import React, { useMemo, useState } from 'react';

import { Loader } from '../components/Loader';
import { TableRow } from '../components/TableRow';
import { useData } from '../hooks/useData';

export const Table: React.FC = () => {
  const { data, countX, loading, handleAddRow } = useData();
  const [isSelected, setSelected] = useState(false);

  const cellAmount = useMemo(() => {
    const cellAmountArray = [];

    for (let i = 0; i < data?.[0]?.length; i++) {
      const amount = Math.round(
        data
          .map((row) => row?.[i]?.cell.amount)
          .reduce((acc, value) => acc + value, 0) / data.length,
      );
      cellAmountArray.push(amount);
    }

    return cellAmountArray;
  }, [data]);

  if (loading) return <Loader />;

  return (
    <div className="table">
      <p>
        <b>M: </b>
        {data?.length}, <b>N: </b>
        {data?.[0]?.length}, <b>X: </b>
        {countX}
      </p>
      {data.map((row, index) => (
        <div className="row" key={index}>
          <TableRow
            entities={row}
            currentRow={index}
            isSelected={isSelected}
            setSelected={setSelected}
          />
        </div>
      ))}
      <div className="row">
        {cellAmount.map((cell, index) => (
          <div className="cell" key={`${index}-${cell}`}>
            {cell}
          </div>
        ))}
        <div className="cell cell-active">
          <button onClick={handleAddRow}>Add Row</button>
        </div>
      </div>
    </div>
  );
};
