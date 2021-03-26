import React, { useContext, useEffect, useRef, useState } from "react";
import Viewport from "./Viewport";
import { useApp } from "@inlet/react-pixi";
import { ViewportContext } from "./ViewportContext";

const MyViewport = ({ children }) => {
  const app = useApp();
  const { viewport, setViewport } = useContext(ViewportContext);
  const viewportRef = useRef();

  useEffect(() => {
    if (viewportRef.current) {
      setViewport(viewportRef.current);
    }
  });

  return app ? (
    <Viewport app={app} ref={viewportRef}>
      {children(viewportRef.current)}
    </Viewport>
  ) : null;
};

export default MyViewport;
