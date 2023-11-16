import React from "react";

const useMouseEnter = (element, callback) => {
  React.useEffect(() => {
    const handleMouseEnter = (event) => {
      callback(event);
    };

    element.current?.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.current?.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [element.current, callback]);
};

export default useMouseEnter;
