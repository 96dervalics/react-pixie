import React, { useContext, useEffect, useRef, useState } from "react";
import Viewport from "./Viewport";
import { useApp } from "@inlet/react-pixi";
import { ViewportContext } from "./ViewportContext";
import { throttle } from "lodash";

const MyViewport = ({ children }) => {
  const app = useApp();
  const { setViewportBox, setViewport } = useContext(ViewportContext);
  const viewportRef = useRef();

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.on(
        "moved",
        throttle(() => {
          console.log(
            viewportRef.current.corner.x +
              " " +
              viewportRef.current.corner.y +
              " " +
              viewportRef.current.worldScreenWidth +
              " " +
              viewportRef.current.worldScreenHeight
          );
          setViewportBox({
            corner: viewportRef.current.corner,
            worldScreenWidth: viewportRef.current.worldScreenWidth,
            worldScreenHeight: viewportRef.current.worldScreenHeight
          });
        }, 100)
      );
      setViewport(viewportRef.current);
    }
  }, [setViewport, setViewportBox]);

  return app ? (
    <Viewport app={app} ref={viewportRef}>
      {children(viewportRef.current)}
    </Viewport>
  ) : null;
};

export default MyViewport;
