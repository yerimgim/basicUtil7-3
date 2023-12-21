const List = async (num: number, length: number) => {
  await new Promise(resolve => {
    // 자꾸 에러가 나는데... ?
    setTimeout((resolve(1), 200));
  });

  return Array(num)
    .fill(null)
    .map((v, i) => {
      return i + length;
    });
};

export default List;
