import React, { useState } from "react";

export const ViewportContext = React.createContext();

export const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState({});

  const value = { viewport, setViewport };

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
};
