import React from 'react';
import { useData } from '../hooks/useData';

interface InputDataProps {
  setOpenTable: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputData: React.FC<InputDataProps> = ({ setOpenTable }) => {
  const { input, setInput, setCreate } = useData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // setCreate(true);
    // setOpenTable(true);
    event.stopPropagation();
  };

  return (
    <div className="data">
      <h2>Input data for a table</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="m">Number of rows from 1 to 100</label>
          <input
            id="m"
            name="m"
            type="number"
            value={input.m}
            min={1}
            max={100}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="n">Number of columns from 1 to 100</label>
          <input
            id="n"
            name="n"
            type="number"
            value={input.n}
            min={1}
            max={100}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="x">Number of selected cells</label>
          <input
            id="x"
            name="x"
            type="number"
            value={input.x}
            min={1}
            max={+input?.m * +input?.n || 100}
            onChange={handleChange}
          />
        </div>
        <button>Create table</button>
      </form>
    </div>
  );
};
