import { useEffect, useState } from "react";

export default function useDebounce(val, delay) {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return debounceVal;
}
