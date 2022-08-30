import React from 'react';
import { useData } from '../hooks/useData';

export const Table: React.FC = () => {
  const { data, loading } = useData();

  return (
    <div>
      <h1>Hello World!</h1>
      <button>Create Table</button>
    </div>
  );
};
