import React from "react";
import Viewport from "./Viewport";
import { useApp } from "@inlet/react-pixi";

// export const active_screen = {
//   corner: Math.Point(0, 0),
//   width: 1000,
//   height: 600
// };
// const ViewportContext = React.createContext(active_screen);

const MyViewport = ({ children }) => {
  const app = useApp();
  return app ? (
    // <ViewportContext.Provider value={active_screen}>
    <Viewport app={app}>{children}</Viewport>
  ) : // </ViewportContext.Provider>
  null;
};

export default MyViewport;
