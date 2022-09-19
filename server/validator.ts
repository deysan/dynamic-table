import { Input } from '../src/types';
import { ParsedUrlQuery } from 'querystring';

type InputData = {
  m: string;
  n: string;
  x: string;
};

export const inputFormat = (inputData: ParsedUrlQuery): Input => {
  const { m, n, x } = inputData as InputData;

  const formatM = +m > 100 ? 100 : +m < 1 ? 1 : +m;
  const formatN = +n > 100 ? 100 : +n < 1 ? 1 : +n;
  const formatX = +x > +m * +n ? +m * +n : +x < 1 ? 1 : +x;

  return { m: formatM, n: formatN, x: formatX };
};

const isNumeric = (num: unknown) =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) &&
  !isNaN(num as number);

export const isValidInput = (data: ParsedUrlQuery) => {
  if (isNumeric(data.m) && isNumeric(data.n) && isNumeric(data.x)) {
    return true;
  }
  return false;
};
