import { DataProvider } from './hooks/useData';
import { InputData } from './components/InputData';
import { Table } from './components/Table';
import { Table as TableType } from './types';
import { useState } from 'react';

interface AppProps {
  data: TableType;
}

const App: React.FC<AppProps> = ({ data }) => {
  const [isOpenTable, setOpenTable] = useState(false);

  return (
    <DataProvider setOpenTable={setOpenTable} data={data}>
      {data ? (
        <Table table={data} />
      ) : (
        <InputData setOpenTable={setOpenTable} />
      )}
    </DataProvider>
  );
};

export default App;
