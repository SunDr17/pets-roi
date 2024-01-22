import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, delay?: null | number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (typeof delay === 'number' && delay >= 0) {
      const intervalId = setInterval(() => savedCallback.current(), delay);

      return () => {
        clearInterval(intervalId);
      };
    }

    return undefined;
  }, [delay]);
}
