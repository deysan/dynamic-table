import { DataProvider } from './hooks/useData';
import { InputData } from './components/InputData';
import { Table } from './components/Table';
import { useState } from 'react';

function App() {
  const [isOpenTable, setOpenTable] = useState(false);

  return (
    <DataProvider setOpenTable={setOpenTable}>
      {isOpenTable ? <Table /> : <InputData setOpenTable={setOpenTable} />}
    </DataProvider>
  );
}

export default App;
