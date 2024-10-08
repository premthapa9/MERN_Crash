import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debvalue, setDebvalue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebvalue(value);
    }, delay);

    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);
  return debvalue;
};

export default useDebounce;
