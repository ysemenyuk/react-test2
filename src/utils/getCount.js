export const getCount = (comments) => {
  if (comments === null) {
    return 0;
  }

  const sum = comments.reduce((acc, i) => {
    acc = acc + 1 + getCount(i.kids);
    return acc;
  }, 0);

  return sum;
};
