import React from "react";

const useMouseLeave = (element, callback) => {
  React.useEffect(() => {
    const handleMouseLeave = (event) => {
      callback(event);
    };

    element.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.current?.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, [element.current, callback]);
};

export default useMouseLeave;
