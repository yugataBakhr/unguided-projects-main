import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { DropDownContext } from "../DropDownProvider";

const FavoritesOption = React.forwardRef(
  ({ icon, name, value, ...delegated }, ref) => {
    const { activeMiniIndex } = React.useContext(DropDownContext);

    return (
      <Wrapper
        role="menuitem"
        ref={ref}
        value={value}
        $activeMiniIndex={activeMiniIndex}
        {...delegated}
      >
        <IconWrapper aria-hidden={true}>
          <Icon id={icon} size={12} strokeWidth={2} />
        </IconWrapper>
        <span>{name}</span>
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 4px;
  padding: 0 4px;
  border-radius: 4px;
  user-select: none;

  background-color: ${({ value, $activeMiniIndex }) =>
    value === $activeMiniIndex
      ? "var(--color-button-hover)"
      : "transparent"};

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

export default FavoritesOption;
