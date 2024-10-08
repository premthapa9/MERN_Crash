import { useEffect, useRef, useState } from "react";

const userIntersection = (option) => {
  const [inter, setInter] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInter(entry.inter);
    }, option);

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [option]);
};

export default userIntersection;
