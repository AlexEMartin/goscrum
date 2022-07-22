import { useState, useEffect } from "react";

const useResize = () => {
  const [IsPhone, setIsPhone] = useState(
    window.innerWidth > 900 ? true : false
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [IsPhone]);

  const handleResize = () => {
    if (window.innerWidth > 900) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  };

  return { IsPhone };
};

export default useResize;
