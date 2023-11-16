import React from "react";
import styled from "styled-components";
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  GitHub,
  Mail,
  Menu,
  Twitter,
  X,
  Youtube,
} from "react-feather";

//import VisuallyHidden from "../VisuallyHidden";

const icons = {
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  github: GitHub,
  mail: Mail,
  menu: Menu,
  close: X,
  twitter: Twitter,
  youtube: Youtube,
};

const Icon = ({ id, color, size, strokeWidth, ...delegated }) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper
      aria-hidden={true}
      strokeWidth={strokeWidth}
      {...delegated}
    >
      <Component color={color} size={size} />
      {/* <VisuallyHidden>{id}</VisuallyHidden> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > svg {
    // to remove magic space
    display: block;
    stroke-width: ${(p) =>
      p.strokeWidth !== undefined ? p.strokeWidth + "px" : undefined};
  }
`;

export default Icon;
