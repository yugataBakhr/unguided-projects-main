import React from "react";
import styled from "styled-components";
import RadioGroupOption from "../RadioGroupOption";
import useKeyDown from "../../hooks/use-keydown";
import { PlaygroundContext } from "../PlaygroundProvider";

const radioOptions = [
  { name: "Sunny Tangerine", color: "hsl(30deg 70% 50%)" },
  { name: "Mystic Lavender", color: "hsl(150deg 70% 50%)" },
  { name: "Cosmic Ocean Blue", color: "hsl(270deg 70% 50%)" },
];

const RadioGroup = () => {
  const { radioGroupMainRef, radioGroupContentRef } =
    React.useContext(PlaygroundContext);
  const [focused, setFocused] = React.useState(0);
  const [radioState, setRadioState] = React.useState([
    true,
    false,
    false,
  ]);
  // for options
  const refs = [];
  for (const item in radioOptions) {
    refs.push(React.useRef());
  }

  const focusedRef = React.useRef(null);

  const handleEscape = (event) => {
    event.preventDefault();
    if (event.key === "Escape") {
      if (focusedRef !== null) {
        radioGroupMainRef.current.focus();
      }
    }
  };

  React.useEffect(() => {
    const handleFocusChange = () => {
      if (document.activeElement === radioGroupContentRef.current) {
        refs[focused].current.focus();
      }
    };
    radioGroupContentRef.current.addEventListener(
      "focus",
      handleFocusChange
    );
    return () => {
      radioGroupContentRef.current.removeEventListener(
        "focus",
        handleFocusChange
      );
    };
  }, [radioGroupContentRef, focused]);

  React.useEffect(() => {
    const handleArrowDown = (event) => {
      const currentIndex = focused;
      if (event.key === "Tab") {
        return;
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        const newIndex = (currentIndex + 1) % radioOptions.length;
        refs[newIndex].current.focus();
        setFocused(newIndex);
        focusedRef.current = refs[newIndex];
      }
    };
    radioGroupMainRef.current.addEventListener(
      "keydown",
      handleArrowDown
    );
    return () => {
      radioGroupMainRef.current.removeEventListener(
        "keydown",
        handleArrowDown
      );
    };
  }, [radioGroupMainRef, focused, setFocused]);

  React.useEffect(() => {
    const handleArrowUp = (event) => {
      const currentIndex = focused;
      if (event.key === "Tab") {
        return;
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const newIndex =
          (currentIndex - 1 + radioOptions.length) %
          radioOptions.length;
        refs[newIndex].current.focus();
        setFocused(newIndex);
        focusedRef.current = refs[newIndex];
      }
    };
    radioGroupMainRef.current.addEventListener(
      "keydown",
      handleArrowUp
    );
    return () => {
      radioGroupMainRef.current.removeEventListener(
        "keydown",
        handleArrowUp
      );
    };
  }, [radioGroupMainRef, focused, setFocused]);

  // Use the focusedRef to maintain focus.
  React.useEffect(() => {
    if (focusedRef.current) {
      focusedRef.current.current.focus();
    }
  }, [focused]);

  useKeyDown("Escape", handleEscape, radioGroupMainRef);

  const toggleRadioState = (number) => {
    const newState = [];
    for (let i = 0; i < radioOptions.length; i++) {
      if (i === number) {
        newState.push(true);
      } else {
        newState.push(false);
      }
    }
    setRadioState(newState);
  };

  return (
    <Wrapper tabIndex="0" ref={radioGroupMainRef}>
      <ContentWrapper
        tabIndex="-1"
        role="radiogroup"
        ref={radioGroupContentRef}
        $borderColorOne={radioState[0]}
        $borderColorTwo={radioState[1]}
      >
        {radioOptions.map((item, index) => (
          <RadioGroupOption
            key={crypto.randomUUID()}
            ref={refs[index]}
            tabIndex="-1"
            firstIndex={index === 0 ? true : false}
            lastIndex={
              index === radioOptions.length - 1 ? true : false
            }
            onClick={() => {
              toggleRadioState(index);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                toggleRadioState(index);
                setTimeout(() => {
                  refs[index].current.focus();
                }, 0);
              }
            }}
            aria-checked={radioState[index]}
            selector={radioState[index]}
          >
            {item.name}
          </RadioGroupOption>
        ))}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  height: max-content;
  --option-width: calc(500px / 2.5);
  --option-height: calc(300px / 6);
  border: 4px solid var(--color-gray-dark);
  border-radius: 4px;
  padding: 8px;
  &:focus-visible {
    outline: 2px solid deeppink;
    outline-offset: 2px;
  }
`;

const ContentWrapper = styled.div`
  --color-border-color-one: ${radioOptions[0].color};
  --color-border-color-two: ${radioOptions[1].color};
  --color-border-color-three: ${radioOptions[2].color};
  padding: 8px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 8px solid;
  border-color: ${(props) =>
    props.$borderColorOne === true
      ? "var(--color-border-color-one)"
      : props.$borderColorTwo === true
      ? "var(--color-border-color-two)"
      : "var(--color-border-color-three)"};
  border-radius: 4px;
  gap: 2px;

  &:focus-visible {
    outline: 2px dashed var(--color-outline);
    outline-offset: 2px;
  }
`;

export default RadioGroup;
