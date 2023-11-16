import React from "react";
import styled from "styled-components";
import Option from "../Option";
import { ArrayDataContext } from "../ArrayDataProvider";
import { DropDownContext } from "../DropDownProvider";
import MiniDropDown from "../MiniDropDown";

const DropDown = ({ ...delegated }) => {
  const { optionsArray } = React.useContext(ArrayDataContext);

  const {
    isMiniDropDown,
    toggleMiniDropDown,
    setActiveMiniIndex,
    elementRefs,
    miniElementRefs,
    dropDownRef,
    isDropDown,
    isToolbar,
    isFullUrl,
    setIsToolbar,
    setIsFullUrl,
  } = React.useContext(DropDownContext);

  return (
    <Wrapper
      tabIndex="-1"
      role="menu"
      id="dropdownMenu"
      $isDropDown={isDropDown}
      ref={dropDownRef}
      {...delegated}
    >
      <DropDownArrowContainer />
      {optionsArray.map((option, index) => {
        if (index === 2) {
          return (
            <React.Fragment key={index}>
              <Separator key="first separator" />
              <Option
                key={option.name}
                name={option.name}
                icon={option.icon}
                value={index}
                tabIndex="-1"
                ref={elementRefs[index]}
                id="Minidropdown Menu"
                aria-haspopup="menu"
                aria-controls="Minidropdown Menu"
                aria-expanded={isMiniDropDown}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === "ArrowRight"
                  ) {
                    event.preventDefault();
                    if (!isMiniDropDown) {
                      toggleMiniDropDown();
                      setTimeout(() => {
                        setActiveMiniIndex(0);
                        miniElementRefs[0].current?.focus();
                      }, 100);
                    } else if (isMiniDropDown) {
                      setActiveMiniIndex(0);
                      miniElementRefs[0].current?.focus();
                    }
                  }
                }}
              />
              {isMiniDropDown && (
                <MiniDropDown
                  key="Minidropdown Menu"
                  aria-labelledby="Minidropdown Menu"
                  tabIndex="-1"
                />
              )}
            </React.Fragment>
          );
        } else if (index === 3) {
          return (
            <React.Fragment key={index}>
              <Option
                key={option.name}
                name={option.name}
                icon={option.icon}
                value={index}
                tabIndex="-1"
                ref={elementRefs[index]}
              />
              <Separator key="second separator" />
            </React.Fragment>
          );
        } else if (index >= 4) {
          return (
            <Option
              key={option.name}
              name={option.name}
              icon={option.icon}
              value={index}
              tabIndex="-1"
              ref={elementRefs[index]}
              role="menuitemcheckbox"
              isChecked={index === 4 ? isToolbar : isFullUrl}
              onClick={
                index === 4
                  ? () => setIsToolbar(!isToolbar)
                  : () => setIsFullUrl(!isFullUrl)
              }
              onKeyDown={
                index === 4
                  ? (event) => {
                      event.key === "Enter" &&
                        setIsToolbar(!isToolbar);
                    }
                  : (event) => {
                      event.key === "Enter" &&
                        setIsFullUrl(!isFullUrl);
                    }
              }
            />
          );
        } else {
          return (
            <Option
              key={option.name}
              name={option.name}
              icon={option.icon}
              value={index}
              tabIndex="-1"
              ref={elementRefs[index]}
            />
          );
        }
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ $isDropDown }) =>
    $isDropDown === true ? "flex" : "none"};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  // gap between Options
  gap: 4px;
  padding: 4px 4px;
  // this component has its children component who have border-radius of 4px
  // so that we have to add 4px to make it look beautiful.
  border-radius: calc(4px + 4px);
  border: 2px solid var(--color-button-border);
  background-color: var(--color-button);
  max-height: ${($isDropDown) =>
    $isDropDown === true ? 300 + "px" : 0};

  animation: var(--animation-curtain-down) 200ms ease-out;
  animation-fill-mode: forwards;
`;

const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--color-button-border-darker);
  opacity: 0;
  animation: var(--animation-show-up) 300ms ease-out;
  animation-fill-mode: forwards;
`;

const DropDownArrowContainer = styled.div`
  &::before {
    content: "";
    position: absolute;
    top: -20px; /* Adjust this to control the distance from the top */
    left: 50%; /* This centers the triangle horizontally */
    border-width: 12px; /* Adjust the size of the triangle */
    border-style: solid;
    border-color: transparent; /* Adjust the color */
    border-bottom-color: var(--color-button);
    transform: translateX(
      -50%
    ); /* Center the triangle horizontally */
    z-index: 1; /* Ensure it's above the dropdown */
  }
`;

export default DropDown;
