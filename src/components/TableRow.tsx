import React, { useState } from 'react';

import { Entity } from '../types';
import { useData } from '../hooks/useData';

interface TableRowProps {
  entities: Entity[];
}

export const TableRow: React.FC<TableRowProps> = ({ entities }) => {
  const { handleChangeAmount } = useData();
  const [isHover, setHover] = useState(false);

  const sumCell = entities.reduce((acc, value) => acc + value.cell.amount, 0);

  return (
    <>
      {entities.map((entity) => {
        return (
          <div
            className="cell"
            key={entity.cell.id}
            onClick={() => handleChangeAmount(entity.row, entity.column)}
          >
            {isHover
              ? Math.round((entity.cell.amount / sumCell) * 100) + '%'
              : entity.cell.amount}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                height: `${
                  isHover
                    ? Math.round((entity.cell.amount / sumCell) * 100) + '%'
                    : '0'
                }`,
                backgroundColor: '#646cff',
              }}
            ></div>
          </div>
        );
      })}
      <div
        className="cell"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {sumCell}
      </div>
    </>
  );
};
