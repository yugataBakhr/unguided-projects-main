import React from "react";
import styled from "styled-components";

const Button = React.forwardRef(({ children, ...delegated }, ref) => {
  // note to self...delegated is the key
  // Without implementing it to Wrapper, onClick doesn't work at all
  return (
    <ButtonWrapper role="button" {...delegated} ref={ref}>
      <ButtonContents>{children}</ButtonContents>
    </ButtonWrapper>
  );
});

const ButtonContents = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  border-color: transparent;
  background-color: var(--color-button);
  color: white;
  transform: translateY(-2px);
  user-select: none;
  z-index: -1;
`;

const ButtonWrapper = styled.button`
  padding: 0;
  height: fit-content;
  border: 0;
  border-radius: 4px;
  border-color: transparent;
  background-color: var(--color-button-back);
  filter: var(--drop-shadow-base);

  &:hover > ${ButtonContents} {
    background-color: var(--color-button-hover);
    animation: var(--animation-hover-joy) 600ms ease-out;
    animation-fill-mode: forwards;
    cursor: pointer;
  }

  &:active > ${ButtonContents} {
    animation: var(--animation-bounce-back) 300ms ease;
  }

  &:focus-visible {
    outline-color: var(--color-outline);
    outline-width: 4px;
    outline-offset: 4px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
    box-shadow: 1px 1px 3px hsl(0deg 0% 0%, 0.7);
  }
`;

export default React.memo(Button);
