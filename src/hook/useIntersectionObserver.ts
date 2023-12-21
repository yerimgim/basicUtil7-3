import { useCallback, useEffect } from "react";

type Props = {
  observerRef: HTMLDivElement | null;
  fetchMoreList: () => void;
  hasMore: boolean;
};

// eslint-disable-next-line no-undef
const options: IntersectionObserverInit = {
  rootMargin: "0px",
  threshold: 0.1,
};

/**
 * 무한 스크롤링 적용 훅
 * @param observerRef 감시할 element ref
 * @param fetchMoreList 추가 패치를 실행할 함수
 * @param hasMore 더 가져올 수 있는지 여부
 * @returns
 */

const useIntersectionObserver = ({
  observerRef,
  fetchMoreList,
  hasMore,
}: Props) => {
  // eslint-disable-next-line no-undef
  const onScroll: IntersectionObserverCallback = useCallback(
    entries => {
      if (!entries[0].isIntersecting) return;
      fetchMoreList();
    },
    [fetchMoreList]
  );
  useEffect(() => {
    if (!observerRef) return;
    const observer = new IntersectionObserver(onScroll, options);
    observer.observe(observerRef);
    if (!hasMore) observer.unobserve(observerRef);
    // eslint-disable-next-line consistent-return
    return () => {
      return observer.disconnect();
    };
  }, [observerRef, onScroll, hasMore]);
};

export default useIntersectionObserver;
