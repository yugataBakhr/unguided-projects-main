import React from "react";
import styled from "styled-components";
import { ArrayDataContext } from "../ArrayDataProvider";
import { DropDownContext } from "../DropDownProvider";
import FavoritesOption from "../FavoritesOption";

const MiniDropDown = ({ ...delegated }) => {
  const { favoritesArray } = React.useContext(ArrayDataContext);
  const {
    isMiniDropDown,
    toggleDropDown,
    toggleMiniDropDown,
    elementRefs,
    miniDropDownRef,
    miniElementRefs,
  } = React.useContext(DropDownContext);

  return (
    <Wrapper
      $isMiniDropDown={isMiniDropDown}
      role="menu"
      ref={miniDropDownRef}
      {...delegated}
    >
      {favoritesArray.map((item, index) => (
        <FavoritesOption
          key={item.name}
          name={item.name}
          icon={item.icon}
          value={index}
          tabIndex="-1"
          ref={miniElementRefs[index]}
          onClick={(event) => {
            event.preventDefault();
            toggleDropDown();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "Enter") {
              event.preventDefault();
              if (isMiniDropDown) {
                setTimeout(() => {
                  toggleMiniDropDown();
                  elementRefs[2].current.focus();
                }, 0);
              }
            } else if (event.key === "Enter") {
              event.preventDefault();
              toggleDropDown();
            }
          }}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: ${({ $isMiniDropDown }) =>
    $isMiniDropDown ? "flex" : "none"};
  flex-direction: column;
  position: absolute;
  top: 64px;
  right: -104px;
  width: 108px;
  height: fit-content;
  gap: 2px;
  padding: 2px;
  background-color: var(--color-button);
  border-radius: 4px;
  border: 2px solid var(--color-button-border);
  z-index: 2;
`;

export default MiniDropDown;
