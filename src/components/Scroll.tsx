import { useCallback, useState } from "react";
import List from "../list/list";
import Box from "./Box";
import useIntersectionObserver from "../hook/useIntersectionObserver";

const Scroll = () => {
  const [boxList, setBoxList] = useState([1, 2, 3, 4, 5, 6]);
  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null);
  const fetchBoxList = useCallback(async () => {
    const fetchedBoxList = await List(6, boxList.length);
    setBoxList(prev => {
      return [...prev, ...fetchedBoxList];
    });
  }, [boxList]);

  useIntersectionObserver({
    observerRef,
    fetchMoreList: fetchBoxList,
    hasMore: boxList.length < 100,
  });

  return (
    <section>
      <h1>무한스크롤 구현</h1>
      <ul className="container">
        {boxList.map(box => {
          return <Box key={box} box={box} />;
        })}
      </ul>
      <div
        style={{ height: "10px", marginBottom: "20px" }}
        ref={setObserverRef}
      />
    </section>
  );
};

export default Scroll;
