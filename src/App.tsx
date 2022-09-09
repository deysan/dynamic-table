import { DataProvider } from './hooks/useData';
import { Input } from './types';
import { InputData } from './components/InputData';
import { Table } from './components/Table';
import { useState } from 'react';

interface AppProps {
  data: Input;
}

const App: React.FC<AppProps> = ({ data }) => {
  const [isOpenTable, setOpenTable] = useState(false);

  return (
    <DataProvider setOpenTable={setOpenTable} data={data}>
      {isOpenTable ? <Table /> : <InputData setOpenTable={setOpenTable} />}
    </DataProvider>
  );
};

export default App;
