/**
 * Filter Even Elements
 * normally even numbers have the feature that number % 2 === 0;
 * JavaScript is, however, zero-based, so want those elements with a modulo of 1:
 */
// export const filterEvenElement = (array = []) => array.filter((item, index) => index % 2 === 0);

export const titles = [
  'nicht so gut',
  'naja',
  'ok',
  'gut',
  'sehr gut',
] as const;


// export const dummy = (count: number) => Array.from(Array(5).keys()).map((index) => ({ index, title: titles[index], component: `icon-vote-${index}`})).filter((item, index) => index % 2 === 0)

/* export const directions = [
  'row',
  'column',
]; */
