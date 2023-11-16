import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Icon from "../Icon";
import { DropDownContext } from "../DropDownProvider";

import DropDown from "../DropDown";

const DropDownMenu = () => {
  const {
    isDropDown,
    isMiniDropDown,
    toggleDropDown,
    toggleMiniDropDown,
    dropDownMenuMainRef,
    contentRef,
    buttonRef,
    setActiveIndex,
    elementRefs,
  } = React.useContext(DropDownContext);

  return (
    <MainWrapper
      tabIndex="0"
      ref={dropDownMenuMainRef}
      onClick={(event) => {
        event.preventDefault();
        if (isDropDown) {
          if (!contentRef.current.contains(event.target)) {
            toggleDropDown();
          }
        }
      }}
    >
      <ContentWrapper tabIndex="-1" ref={contentRef}>
        <Button
          type="button"
          tabIndex="-1"
          role="button"
          aria-haspopup="menu"
          aria-controls="dropdownmenu"
          aria-expanded={isDropDown}
          id="Dropdown Menu"
          {...(isDropDown ? { "aria-controls": "dropdownmenu" } : {})}
          onClick={(event) => {
            event.preventDefault();
            toggleDropDown();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (!isDropDown) {
                toggleDropDown();
                setTimeout(() => {
                  setActiveIndex(0);
                  if (isMiniDropDown) {
                    console.log("i don't know");
                    toggleMiniDropDown();
                  }
                  elementRefs[0]?.current.focus();
                }, 200);
              }
            }
          }}
          ref={buttonRef}
        >
          Options
          <Icon
            id={isDropDown ? "chevron-up" : "chevron-down"}
            size={14}
            strokeWidth={2}
          />
        </Button>
        <DropDown
          id="dropdownmenu"
          aria-labelledby="Dropdown menu"
          aria-expanded={isDropDown}
        />
      </ContentWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 360px;
  color: white;
  border: 4px solid var(--color-gray-dark);
  border-radius: 4px;
  padding: 8px;
  padding-top: 40px;
  filter: var(--drop-shadow-base);
  &:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export default DropDownMenu;
