import React, { useState } from "react";

export const ViewportContext = React.createContext();

export const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState({});
  const [viewportBox, setViewportBox] = useState({
    corner: {
      x: 0,
      y: 0
    }
  });

  const value = { viewport, setViewport, viewportBox, setViewportBox };

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
};
