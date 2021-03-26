import React from "react";
import Viewport from "./Viewport";
import { useApp } from "@inlet/react-pixi";

const MyViewport = ({ children }) => {
  const app = useApp();
  return app ? <Viewport app={app}>{children}</Viewport> : null;
};

export default MyViewport;
