import { useEffect, useState } from "react";

const useOnline = () => {
  const [online, setOnline] = useState(true);

  function handleOnline() {
    setOnline(true);
  }
  function handleOffline() {
    setOnline(false);
  }
  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
};

export default useOnline;
