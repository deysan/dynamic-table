export const getRandomCount = () =>
  Math.floor(Math.random() * (0 + (100 - 0 + 1)));

export const getRandomAmount = () =>
  Math.floor(Math.random() * (999 - 100 + 1) + 100);

export const getRandomX = (m: number, n: number) =>
  Math.floor(Math.random() * (0 + (m * n - 0 + 1)));
