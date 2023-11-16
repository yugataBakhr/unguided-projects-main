import React from "react";
import useKeyDown from "../../hooks/use-keydown";

export const PlaygroundContext = React.createContext();

const PlaygroundProvider = ({ children }) => {
  const dropDownMenuMainRef = React.useRef();
  const contentRef = React.useRef();
  const buttonRef = React.useRef();
  const switchMainRef = React.useRef();
  const switchButtonRef = React.useRef();
  const radioGroupMainRef = React.useRef();
  const radioGroupContentRef = React.useRef();
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (document.activeElement === dropDownMenuMainRef.current) {
        buttonRef.current.focus();
      } else if (document.activeElement === switchMainRef.current) {
        switchButtonRef.current.focus();
      } else if (
        document.activeElement === radioGroupMainRef.current
      ) {
        radioGroupContentRef.current.focus();
      }
    }
  };
  const handleEscape = (event) => {
    event.preventDefault();
    if (event.key === "Escape") {
      event.preventDefault();
    }
  };
  useKeyDown("Enter", handleEnter);
  useKeyDown("Escape", handleEscape);
  return (
    <PlaygroundContext.Provider
      value={{
        handleEnter,
        handleEscape,
        dropDownMenuMainRef,
        contentRef,
        buttonRef,
        switchMainRef,
        switchButtonRef,
        radioGroupMainRef,
        radioGroupContentRef,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};

export default PlaygroundProvider;
