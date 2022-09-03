import React, { useState } from 'react';

import { Row } from '../types';
import { useData } from '../hooks/useData';

interface TableRowProps {
  row: Row;
  rowId: string;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableRow: React.FC<TableRowProps> = ({
  row,
  rowId,
  isSelected,
  setSelected,
}) => {
  const { handleChangeCell, handleDeleteRow, handleSelectCell, selectedCell } =
    useData();
  const [isHover, setHover] = useState(false);

  const selectedCurrentCell = (cellAmount: number, cellId: string) => {
    setSelected(true);
    handleSelectCell(cellAmount, cellId);
  };

  const sumCell = row.reduce((acc, cell) => acc + cell.amount, 0);

  return (
    <>
      {row.map((cell) => {
        return (
          <div
            className="cell"
            key={cell.id}
            onClick={() => handleChangeCell(rowId, cell.id)}
            onMouseEnter={() => selectedCurrentCell(cell.amount, cell.id)}
            onMouseLeave={() => setSelected(false)}
            style={{
              color: `${
                isSelected && selectedCell.includes(cell.id)
                  ? '#646cff'
                  : '#213547'
              }`,
              backgroundColor: `${
                isSelected && selectedCell.includes(cell.id)
                  ? '#dddefc'
                  : '#ffffff'
              }`,
            }}
          >
            {isHover
              ? Math.round((cell.amount / sumCell) * 100) + '%'
              : cell.amount}
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
                backgroundColor: '#646cff',
              }}
            ></div>
          </div>
        );
      })}
      <div
        className="cell cell-active"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {sumCell}
        {isHover && (
          <button className="btn-delete" onClick={() => handleDeleteRow(rowId)}>
            X
          </button>
        )}
      </div>
    </>
  );
};
