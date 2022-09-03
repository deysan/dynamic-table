import React, { useMemo, useState } from 'react';

import { Loader } from '../components/Loader';
import { TableRow } from '../components/TableRow';
import { useData } from '../hooks/useData';

export const Table: React.FC = () => {
  const { table, countX, loading, handleAddRow } = useData();
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

  if (loading) return <Loader />;

  return (
    <div className="table">
      <p>
        <>
          <b>M: </b>
          {Object.keys(table)?.length}
        </>
        {', '}
        <>
          <b>N: </b>
          {Object.values(table)?.[0]?.length}
        </>
        {', '}
        <>
          <b>X: </b>
          {countX}
        </>
      </p>
      {Object.keys(table).map((row) => (
        <div className="row" key={row}>
          <TableRow
            row={table[row]}
            rowId={row}
            isSelected={isSelected}
            setSelected={setSelected}
          />
        </div>
      ))}
      <div className="row">
        {columnAverage.map((cell, index) => (
          <div className="cell" key={`columnAverage-${index}`}>
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
