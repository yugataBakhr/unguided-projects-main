import React from "react";

export const ArrayDataContext = React.createContext();

const optionsArray = [
  { name: "New Tab", icon: null },
  { name: "New Window", icon: null },
  { name: "Favorites", icon: "chevron-right" },
  { name: "Downloads", icon: null },
  { name: "Show Toolbar", icon: null },
  { name: "Show Full URLs", icon: null },
];

const favoritesArray = [
  { name: "GitHub", icon: "github" },
  { name: "Twitter", icon: "twitter" },
  { name: "YouTube", icon: "youtube" },
];

const ArrayDataProvider = ({ children }) => {
  return (
    <ArrayDataContext.Provider
      value={{
        optionsArray,
        favoritesArray,
      }}
    >
      {children}
    </ArrayDataContext.Provider>
  );
};

export default ArrayDataProvider;
