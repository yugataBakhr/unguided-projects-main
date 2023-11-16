import React from "react";
import styled from "styled-components";

import RadioSelector from "../RadioSelector";

const RadioGroupOption = React.forwardRef(
  (
    {
      firstIndex,
      lastIndex,
      children,
      index,
      selector,
      ...delegated
    },
    ref
  ) => {
    return (
      <Button
        type="button"
        role="radio"
        ref={ref}
        $firstIndex={firstIndex}
        $lastIndex={lastIndex}
        {...delegated}
      >
        <RadioSelector selector={selector} />
        {children}
      </Button>
    );
  }
);

const Button = styled.button`
  width: var(--option-width) + 8px; // For 8px of padding in parent component.
  height: var(--option-height);
  --width-selector: calc(var(--option-width) * 0.25);
  --width-label: calc(var(--option-width) * 0.75);
  filter: var(--drop-shadow-base);
  display: grid;
  grid-template-columns: var(--width-selector) var(--width-label);
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: start;
  background-color: var(--color-button);
  color: var(--color-background);
  border: 2px solid var(--color-button-back);
  border-top-left-radius: ${({ $firstIndex }) =>
    $firstIndex ? "4px" : "0"};
  border-top-right-radius: ${({ $firstIndex }) =>
    $firstIndex ? "4px" : "0"};
  border-bottom-left-radius: ${({ $lastIndex }) =>
    $lastIndex ? "4px" : "0"};
  border-bottom-right-radius: ${({ $lastIndex }) =>
    $lastIndex ? "4px" : "0"};

  &:focus-visible {
    outline: 2px solid var(--color-outline);
  }
`;

export default RadioGroupOption;
