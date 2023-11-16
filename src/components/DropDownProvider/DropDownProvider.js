import React from "react";
import useKeyDown from "../../hooks/use-keydown";
import useMouseEnter from "../../hooks/use-mouseenter";
import useMouseLeave from "../../hooks/use-mouseleave";
import { ArrayDataContext } from "../ArrayDataProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

export const DropDownContext = React.createContext();

function DropDownProvider({ children }) {
  const { optionsArray, favoritesArray } =
    React.useContext(ArrayDataContext);
  const { dropDownMenuMainRef, contentRef, buttonRef } =
    React.useContext(PlaygroundContext);
  // when isDropDown is true drop down opens, when false drop down closed
  const [isDropDown, setIsDropDown] = React.useState(false);
  const [isMiniDropDown, setIsMiniDropDown] = React.useState(false);
  // numbers 0 through optionsArray.length -1 is set when it is needed
  const [activeIndex, setActiveIndex] = React.useState(undefined);
  const [activeMiniIndex, setActiveMiniIndex] =
    React.useState(undefined); // used in MiniDropDown
  // toggle check mark when its clicked or keydowned.
  const [isToolbar, setIsToolbar] = React.useState(false);
  const [isFullUrl, setIsFullUrl] = React.useState(false);

  const elementRefs = [];
  for (let i = 0; i < optionsArray.length; i++) {
    elementRefs.push(React.useRef());
  }

  const dropDownRef = React.useRef();

  const miniDropDownRef = React.useRef();

  const miniElementRefs = [];
  for (let i = 0; i < favoritesArray.length; i++) {
    miniElementRefs.push(React.useRef());
  }

  // toggle dropDown & miniDropDown menu
  const toggleDropDown = () => {
    if (isDropDown === true) {
      setIsDropDown(false);
      setIsMiniDropDown(false);
      setActiveIndex(undefined);
      setActiveMiniIndex(undefined);
    } else {
      setIsDropDown(true);
    }
  };

  const toggleMiniDropDown = () => {
    if (isMiniDropDown === true) {
      setTimeout(() => {
        setIsMiniDropDown(false);
        setActiveMiniIndex(undefined);
        elementRefs[2].current.focus();
      }, 0);
    } else {
      setTimeout(() => {
        setIsMiniDropDown(true);
      }, 0);
    }
  };

  const handleEscape = (event) => {
    event.preventDefault();
    if (isDropDown) {
      toggleDropDown();
    }
    dropDownMenuMainRef.current.focus();
  };

  const handleArrowDown = () => {
    if (isDropDown && !isMiniDropDown) {
      let currentIndex;
      if (activeIndex === undefined) {
        currentIndex = elementRefs.length - 1;
      } else {
        currentIndex = activeIndex;
      }

      // nextIndex can't exceed the value after %(modulo operater)
      // 5 % 6 = 5, 3 % 6 = 3, 6 % 6 = 0. What a magic🤣
      const nextIndex = (currentIndex + 1) % elementRefs.length;
      setActiveIndex(nextIndex);
      if (isMiniDropDown) {
        setIsMiniDropDown(false);
        setActiveMiniIndex(undefined); // In case user's mouse is on mini drop down.
      }
      setTimeout(() => {
        elementRefs[nextIndex].current.focus();
      }, 0);
    } else {
      return;
    }
  };

  const handleArrowUp = () => {
    if (isDropDown && !isMiniDropDown) {
      let currentIndex;
      if (activeIndex === undefined) {
        currentIndex = 0;
      } else {
        currentIndex = activeIndex;
      }
      // nextIndex can't exceed the value after %(modulo operater)
      // 5 % 6 = 5, 3 % 6 = 3, 6 % 6 = 0. What a magic🤣
      const previousIndex =
        (currentIndex - 1 + elementRefs.length) % elementRefs.length;
      setActiveIndex(previousIndex);
      if (isMiniDropDown) {
        setIsMiniDropDown(false);
        setActiveMiniIndex(undefined); // In case user's mouse is on mini drop down.
      }
      setTimeout(() => {
        elementRefs[previousIndex].current.focus();
      }, 0);
    } else {
      return;
    }
  };

  const handleArrowDownInMiniDropDown = () => {
    if (isMiniDropDown) {
      // I set activeMiniIndex to be 3 when user move the cursor out of MiniDropDown
      if (activeMiniIndex === 3) {
        setActiveMiniIndex(0);
        miniElementRefs[0].current.focus();
      } else {
        const currentIndex = activeMiniIndex;

        const nextIndex = (currentIndex + 1) % miniElementRefs.length;
        setActiveMiniIndex(nextIndex);
        miniElementRefs[nextIndex].current.focus();
      }
    } else {
      return;
    }
  };

  const handleArrowUpInMiniDropDown = () => {
    if (isMiniDropDown) {
      const currentIndex = activeMiniIndex;

      const previousIndex =
        (currentIndex - 1 + miniElementRefs.length) %
        miniElementRefs.length;
      setActiveMiniIndex(previousIndex);
      miniElementRefs[previousIndex].current.focus();
    } else {
      return;
    }
  };

  const handleMouseEnter = (event) => {
    const isInsideMiniDropDown =
      miniDropDownRef.current &&
      (miniDropDownRef.current === event.target ||
        miniDropDownRef.current.contains(event.target));

    if (isInsideMiniDropDown) {
      //setActiveIndex(2); maybe not necessary
      value = Number(event.target.getAttribute("value"));
      setActiveMiniIndex(value);
      miniElementRefs[value].current.focus();
    } else {
      value = Number(event.target.getAttribute("value"));
      setActiveIndex(value);
      if (event.target === elementRefs[2].current) {
        if (document.activeElement === elementRefs[2].current) {
          setIsMiniDropDown(true);
        }
        if (event.relatedTarget === miniDropDownRef.current) {
          setActiveMiniIndex(undefined);
          elementRefs[2].current.focus();
        }
      } else {
        if (isMiniDropDown) {
          toggleMiniDropDown();
        }
      }
      elementRefs[value].current.focus();
    }
  };

  const handleMouseLeave = (event) => {
    if (event.target === dropDownMenuMainRef.current) {
      if (isDropDown) {
        //toggleDropDown();
      }
    } else if (event.target === contentRef.current) {
      if (isMiniDropDown) {
        setActiveMiniIndex(3);
      } else {
        setActiveIndex(undefined);
      }
    } else if (event.target === miniDropDownRef.current) {
      if (event.relatedTarget === elementRefs[2].current) {
        setActiveMiniIndex(undefined);
        elementRefs[2].current.focus();
      } else {
        // don't do anything
        setActiveMiniIndex(4);
      }
    }
  };

  useKeyDown("Escape", handleEscape, dropDownMenuMainRef);
  useKeyDown("ArrowDown", handleArrowDown, dropDownRef);
  useKeyDown("ArrowUp", handleArrowUp, dropDownRef);
  //
  useKeyDown(
    "ArrowDown",
    handleArrowDownInMiniDropDown,
    miniDropDownRef
  );
  useKeyDown("ArrowUp", handleArrowUpInMiniDropDown, miniDropDownRef);

  useMouseLeave(miniDropDownRef, handleMouseLeave);
  useMouseLeave(contentRef, handleMouseLeave);
  useMouseLeave(dropDownMenuMainRef, handleMouseLeave);

  useMouseLeave(elementRefs[2], handleMouseLeave);

  for (const elementRef of elementRefs) {
    useMouseEnter(elementRef, handleMouseEnter);
  }

  for (const miniElementRef of miniElementRefs) {
    useMouseEnter(miniElementRef, handleMouseEnter);
  }

  return (
    <DropDownContext.Provider
      value={{
        isDropDown,
        setIsDropDown,
        isMiniDropDown,
        setIsMiniDropDown,
        activeIndex,
        setActiveIndex,
        activeMiniIndex,
        setActiveMiniIndex,
        toggleDropDown,
        toggleMiniDropDown,
        handleEscape,
        handleArrowDown,
        handleArrowUp,
        handleArrowDownInMiniDropDown,
        handleArrowUpInMiniDropDown,
        handleMouseEnter,
        handleMouseLeave,
        dropDownMenuMainRef,
        contentRef,
        buttonRef,
        elementRefs,
        dropDownRef,
        miniDropDownRef,
        miniElementRefs,
        isToolbar,
        isFullUrl,
        setIsToolbar,
        setIsFullUrl,
      }}
    >
      {children}
    </DropDownContext.Provider>
  );
}
export default DropDownProvider;
