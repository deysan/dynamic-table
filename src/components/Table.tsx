import React, { useMemo, useState } from 'react';

import { Input } from '../types';
import { Loader } from './Loader';
import { TableRow } from './TableRow';
import { useData } from '../hooks/useData';

interface TableProps {
  input: Input;
}

export const Table: React.FC<TableProps> = ({ input }) => {
  const { table, loading, handleAddRow, refreshTable } = useData();
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
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
