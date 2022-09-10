import { Input } from '../src/types';
import { ParsedUrlQuery } from 'querystring';

export const inputValidation = (inputData: ParsedUrlQuery) => {
  let { m, n, x } = inputData as Input;

  m = +m > 99 ? '99' : +m < 1 ? '1' : m;
  n = +n > 99 ? '99' : +n < 1 ? '1' : n;
  x = +x > +m * +n ? `${+m * +n}` : +x < 1 ? '1' : x;

  return { m, n, x };
};

export const isEmptyData = (data: {}) => {
  for (let i in data) return false;
  return true;
};
