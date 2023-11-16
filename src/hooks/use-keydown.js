import React from "react";

const useKeyDown = (key, callback, ref) => {
  //const listenerRef = React.useRef();
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === key) {
        if (event.key === "Tab") {
          callback(event);
        } else {
          event.preventDefault();
          callback(event);
        }
      }
    };

    if (ref !== undefined) {
      //listenerRef.current = handleKeyDown;
      ref.current?.addEventListener("keydown", handleKeyDown);
    } else {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (ref !== undefined) {
        ref.current?.removeEventListener("keydown", handleKeyDown);
      } else {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [key, callback, ref]);
};

export default useKeyDown;
