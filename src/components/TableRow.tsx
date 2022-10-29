import { useState } from 'react';

import { Row } from '../types';
import { useData } from '../hooks/useData';

interface TableRowProps {
  row: Row;
  rowId: string;
  rowCount: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TableRow({
  row,
  rowId,
  rowCount,
  isSelected,
  setSelected,
}: TableRowProps) {
  const { handleChangeCell, handleDeleteRow, setCurrentCell, selectedCells } =
    useData();

  const [isHover, setHover] = useState(false);

  const sumCell = row.reduce((acc, cell) => acc + cell.amount, 0);

  return (
    <>
      {row.map((cell) => {
        return (
          <td
            className="cell"
            key={cell.id}
            onClick={() => handleChangeCell(rowId, cell.id)}
            onMouseEnter={() => {
              setSelected(true);
              setCurrentCell({ amount: cell.amount, id: cell.id });
            }}
            onMouseLeave={() => setSelected(false)}
            style={{
              color: `${
                isSelected && selectedCells.includes(cell.id)
                  ? '#646cff'
                  : '#213547'
              }`,
              backgroundColor: `${
                isSelected && selectedCells.includes(cell.id)
                  ? '#dddefc'
                  : '#ffffff'
              }`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                height: `${
                  isHover
                    ? Math.round((cell.amount / sumCell) * 100) + '%'
                    : '0'
                }`,
                color: 'white',
                backgroundColor: '#bbbeff',
                zIndex: '1',
              }}
            ></div>
            <span
              style={{
                zIndex: '2',
              }}
            >
              {isHover
                ? Math.round((cell.amount / sumCell) * 100) + '%'
                : cell.amount}
            </span>
          </td>
        );
      })}
      <td
        className="cell cell-active"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {sumCell}
        {isHover && (
          <button
            className="btn-delete"
            style={{
              width: '24px',
              height: '24px',
            }}
            onClick={() => handleDeleteRow(rowId)}
            disabled={rowCount === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </td>
    </>
  );
}
