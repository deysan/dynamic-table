import React, { useMemo, useState } from 'react';

import { Loader } from './Loader';
import { TableRow } from './TableRow';
import { useData } from '../hooks/useData';

export const Table: React.FC = () => {
  const { input, table, loading, handleAddRow, refreshTable } = useData();
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
      <p style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <span>
          <b>M: </b>
          {Object.keys(table).length}
          {', '}
        </span>
        <span>
          <b>N: </b>
          {input.n}
          {', '}
        </span>
        <span>
          <b>X: </b>
          {input.x}
        </span>
        <button
          style={{
            width: '24px',
            height: '24px',
          }}
          onClick={refreshTable}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
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
