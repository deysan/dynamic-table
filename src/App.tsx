import { DataProvider } from './hooks/useData';
import { Table } from './layout/Table';

function App() {
  return (
    <DataProvider>
      <Table />
    </DataProvider>
  );
}

export default App;
