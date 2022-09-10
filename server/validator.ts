import { Input } from '../src/types';

export const validator = (inputData: Input) => {
  let { m, n, x } = inputData;

  m = +m > 99 ? '99' : +m < 1 ? '1' : m;
  n = +n > 99 ? '99' : +n < 1 ? '1' : n;
  x = +x > +m * +n ? `${+m * +n}` : +x < 1 ? '1' : x;

  return { m, n, x };
};
