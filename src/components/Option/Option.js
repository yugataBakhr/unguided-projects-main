import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { DropDownContext } from "../DropDownProvider";

const Option = React.forwardRef(
  ({ name, icon, value, isChecked, ...delegated }, ref) => {
    const { activeIndex, activeMiniIndex, isMiniDropDown } =
      React.useContext(DropDownContext);

    const ariaCheckedValue = isChecked
      ? "true"
      : isChecked === false
      ? "false"
      : undefined;

    return (
      <Wrapper
        role="menuitem"
        ref={ref}
        value={value}
        $activeIndex={activeIndex}
        $activeMiniIndex={activeMiniIndex}
        aria-checked={ariaCheckedValue}
        aria-hidden={false}
        {...delegated}
      >
        <IconWrapper aria-hidden={true}>
          {isChecked && (
            <Icon id={"check"} size={14} strokeWidth={2} />
          )}
        </IconWrapper>
        {name}
        <IconWrapper aria-hidden={true}>
          {icon && <Icon id={icon} size={14} strokeWidth={2} />}
        </IconWrapper>
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  // This is the most inner border-radius in the tree.
  border-radius: 4px;
  cursor: default;
  position: relative;
  display: grid;
  grid-template-columns: 24px 120px 24px;
  opacity: 0;
  user-select: none; //To make text not selectable.
  background-color: ${({ value, $activeIndex, $activeMiniIndex }) =>
    value === $activeIndex && $activeMiniIndex !== undefined
      ? "var(--color-button-hover-darker)"
      : value === $activeIndex && $activeMiniIndex === undefined
      ? "var(--color-button-hover)"
      : "transparent"};

  animation: var(--animation-show-up) 200ms ease-out;
  animation-fill-mode: forwards;
  animation-delay: 200ms;

  &:focus,
  &:hover {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Option;
