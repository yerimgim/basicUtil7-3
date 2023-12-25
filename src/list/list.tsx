const List = async (num: number, length: number) => {
  await new Promise(resolve => {
    setTimeout(() => {
      return resolve(1), 200;
    });
  });

  return Array(num)
    .fill(null)
    .map((v, i) => {
      return i + length;
    });
};

export default List;
