import React from "react";
import styled from "styled-components";

const VisuallyHidden = ({ children }) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (event) => {
        if (event.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return <ShowWrapper>{children}</ShowWrapper>;
  }
  return <HiddenWrapper>{children}</HiddenWrapper>;
};

const HiddenWrapper = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

const ShowWrapper = styled.span`
  font-size: 0.5rem;
`;

export default VisuallyHidden;
