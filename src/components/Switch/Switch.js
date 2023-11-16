import React from "react";
import styled from "styled-components";
import SwitchButton from "../SwitchButton";
import useKeyDown from "../../hooks/use-keydown";
import { PlaygroundContext } from "../PlaygroundProvider";

const Switch = () => {
  const { switchMainRef } = React.useContext(PlaygroundContext);

  const handleEscape = (event) => {
    event.preventDefault();
    if (event.key === "Escape") {
      switchMainRef.current.focus();
    }
  };

  useKeyDown("Escape", handleEscape, switchMainRef);

  return (
    <Wrapper tabIndex="0" ref={switchMainRef}>
      <SwitchButton></SwitchButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border: 4px solid var(--color-gray-dark);
  border-radius: 4px;
  &:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }
`;

export default Switch;
