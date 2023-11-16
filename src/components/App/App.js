import React from "react";

import Playground from "../Playground";
import PlaygroundProvider from "../PlaygroundProvider";
import GlobalStyles from "../GlobalStyles";

export function App() {
  return (
    <>
      <PlaygroundProvider>
        <Playground />
      </PlaygroundProvider>
      <GlobalStyles />
    </>
  );
}
