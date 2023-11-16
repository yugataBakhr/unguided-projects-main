import React from "react";
import styled from "styled-components";
import { PlaygroundContext } from "../PlaygroundProvider";

const SwitchButton = () => {
  const [isTrue, setIsTrue] = React.useState(false);
  const { switchButtonRef } = React.useContext(PlaygroundContext);

  const handleClick = (event) => {
    event.preventDefault();
    if (event.type === "click") {
      setTimeout(() => {
        console.log(event.type);
        setIsTrue(!isTrue);
      }, 300);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      return;
    }
    event.preventDefault();
    if (
      event.type === "keydown" &&
      (event.key === "Enter" || event.key === " ")
    ) {
      setTimeout(() => {
        setIsTrue(!isTrue);
      }, 200);
    }
  };

  React.useEffect(() => {
    switchButtonRef.current.addEventListener("click", handleClick);
    switchButtonRef.current.addEventListener(
      "keydown",
      handleKeyDown
    );
    return () => {
      switchButtonRef.current.removeEventListener(
        "click",
        handleClick
      );
      switchButtonRef.current.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isTrue]);

  return (
    <Wrapper
      tabIndex="-1"
      type="button"
      role="switch"
      ref={switchButtonRef}
      $isTrue={isTrue}
      aria-checked={isTrue}
      aria-label="Demo Switch"
      value={isTrue ? "on" : "off"}
    >
      <SwitchKey $isTrue={isTrue}></SwitchKey>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  position: relative;
  display: flex;
  justify-content: ${({ $isTrue }) =>
    $isTrue ? "flex-start" : "flex-end"};
  align-content: center;
  padding: 2px;
  width: 44px;
  height: 28px;
  filter: drop-shadow(--drop=shadow-base);
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $isTrue }) =>
    $isTrue
      ? "var(--color-button-border)"
      : "var(--color-button-border-darker)"};
  border-radius: 18px;
  background-color: ${({ $isTrue }) =>
    $isTrue
      ? "var(--color-button-hover)"
      : "var(--color-button-back)"};

  &:focus-visible {
    outline: 2px solid var(--color-outline);
  }

  // fallback focus styles for older browser.
  /* Focusing the button with a mouse, touch, or stylus will show a subtle drop shadow. */
  &:focus:not(:focus-visible) {
    outline: none;
    //box-shadow: 1px 1px 5px rgba(1, 1, 0, 0.7);
  }

  &:hover {
    outline: none;
  }
`;

const SwitchKey = styled.span`
  background-color: var(--color-background);
  width: 20px;
  height: 20px;
  border-radius: 16px;
  filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
  animation: ${({ $isTrue }) =>
    $isTrue
      ? "var(--animation-switch-on) 150ms ease-out"
      : "var(--animation-switch-off) 150ms ease-in"};
  animation-fill-mode: both;
`;

export default SwitchButton;
