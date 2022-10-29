import { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { TableRow } from './TableRow';
import { useData } from '../hooks/useData';

export function Table() {
  const { input, table, columnAverage, handleAddRow } = useData();

  const [isSelected, setSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <table className="table">
        <thead>
          <tr>
            <th colSpan={Object.values(table)[0]?.length}>
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
                onClick={() => (window.location.href = '/')}
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
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(table).map((row) => (
            <tr className="row" key={row}>
              <TableRow
                row={table[row]}
                rowId={row}
                rowCount={Object.keys(table).length}
                isSelected={isSelected}
                setSelected={setSelected}
              />
            </tr>
          ))}
          <tr className="row">
            {columnAverage.map((cell, index) => (
              <td className="cell" key={`columnAverage-${index}`}>
                {cell}
              </td>
            ))}
            <td className="cell cell-active">
              <button
                onClick={handleAddRow}
                disabled={Object.keys(table).length === 99}
              >
                Add Row
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
