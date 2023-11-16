import React from "react";
import styled from "styled-components";
import DropDownMenu from "../DropDownMenu";
import Switch from "../Switch";
import RadioGroup from "../RadioGroup";
import DropDownProvider from "../DropDownProvider";
import ArrayDataProvider from "../ArrayDataProvider";

const Playground = () => {
  return (
    <Wrapper aria-live="polite">
      <ArrayDataProvider>
        <DropDownProvider>
          <DropDownMenu />
        </DropDownProvider>
      </ArrayDataProvider>
      <Switch />
      <RadioGroup />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 900px;
  padding: 16px;
`;

export default Playground;
