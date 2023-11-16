import React from "react";
import styled from "styled-components";

const RadioSelector = ({ selector }) => {
  return (
    <CircleWrapper>
      {selector && <CircleContent $selector={true} />}
    </CircleWrapper>
  );
};

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  width: calc(var(--option-height) * 0.4);
  height: calc(var(--option-height) * 0.4);
  border-radius: 50%;
`;

const CircleContent = styled.span`
  display: block;
  width: calc(var(--option-height) * 0.3);
  height: calc(var(--option-height) * 0.3);
  background-color: var(--color-button-hover);
  border-radius: 50%;
`;

export default RadioSelector;
