import { Entity } from '../types';
import React from 'react';
import { useData } from '../hooks/useData';

interface TableRowProps {
  entities: Entity[];
}

export const TableRow: React.FC<TableRowProps> = ({ entities }) => {
  const { handleChangeAmount } = useData();

  return (
    <>
      {entities.map((entity) => {
        return (
          <div
            className="cell"
            key={entity.cell.id}
            onClick={() => handleChangeAmount(entity.row, entity.column)}
          >
            {entity.cell.amount}
          </div>
        );
      })}
      <div className="cell">
        {entities.reduce((acc, value) => acc + value.cell.amount, 0)}
      </div>
    </>
  );
};
