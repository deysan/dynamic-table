import { DataProvider } from './hooks/useData';
import { InputData } from './components/InputData';
import { ServerData } from './types';
import { Table } from './components/Table';
import { useState } from 'react';

interface AppProps {
  data: ServerData;
}

const App: React.FC<AppProps> = ({ data }) => {
  const [isOpenTable, setOpenTable] = useState(false);

  return (
    <DataProvider setOpenTable={setOpenTable} data={data}>
      {data ? (
        <Table input={data.input} />
      ) : (
        <InputData setOpenTable={setOpenTable} />
      )}
    </DataProvider>
  );
};

export default App;
