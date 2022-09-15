import { DataProvider } from './hooks/useData';
import { InputData } from './components/InputData';
import { ServerData } from './types';
import { Table } from './components/Table';

interface AppProps {
  data: ServerData;
}

function App({ data }: AppProps) {
  return (
    <DataProvider data={data}>
      {data ? <Table input={data.input} /> : <InputData />}
    </DataProvider>
  );
}

export default App;
