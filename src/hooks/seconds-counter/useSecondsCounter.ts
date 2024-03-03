import { useCallback, useEffect, useMemo, useState } from "react";

let timerId: NodeJS.Timeout;

export const useSecondsCounter = () => {
  const [count, setCount] = useState<number>(10);
  const [startCount, setStartCount] = useState<boolean>(true);

  useEffect(() => {
    if (startCount) {
      timerId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          } else {
            clearInterval(timerId);
            return prevCount;
          }
        });
      }, 1200);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [startCount]);

  const handleResetCount = useCallback((value: number) => setCount(value), []);
  const handleStartCount = useCallback(
    (value: boolean) => setStartCount(value),
    []
  );

  return useMemo(() => {
    return { count, handleResetCount, handleStartCount };
  }, [count, handleResetCount, handleStartCount]);
};
