import React, { useCallback, useEffect, useState } from 'react';

import { Loader } from './Loader';
import { Input } from '../types';

export function InputData() {
  const [input, setInput] = useState<Input>({ m: 5, n: 10, x: 3 });
  const [loading, setLoading] = useState(true);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setInput((prevState) => ({ ...prevState, [name]: value }));
    },
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="data">
        <h2>Input data for a table</h2>
        <form className="form">
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
          <button type="submit">Create table</button>
        </form>
      </div>
    </>
  );
}
