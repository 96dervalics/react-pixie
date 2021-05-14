import { Graphics } from "@inlet/react-pixi";
import { useContext, useState } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { ViewportContext } from "./ViewportContext";

export const Connection = ({ source_x, source_y, target_x, target_y }) => {
  const { viewportBox } = useContext(ViewportContext);

  const draw = (graphic) => {
    graphic.clear();

    graphic.lineStyle(2, 0x000000);
    graphic.moveTo(source_x, source_y);
    graphic.lineTo(target_x, target_y);
  };

  return IsInViewport(viewportBox, source_x, source_y, target_x, target_y) ? (
    <Graphics draw={draw} />
  ) : null;
};

const IsInViewport = (viewportBox, source_x, source_y, target_x, target_y) => {
  if (
    source_x >= target_x &&
    viewportBox.corner.x < source_x &&
    viewportBox.corner.x + viewportBox.worldScreenWidth > target_x &&
    viewportBox.corner.y < target_y &&
    viewportBox.corner.y + viewportBox.worldScreenHeight > source_y
  ) {
    return true;
  } else if (
    source_x < target_x &&
    viewportBox.corner.x < target_x &&
    viewportBox.corner.x + viewportBox.worldScreenWidth > source_x &&
    viewportBox.corner.y < target_y &&
    viewportBox.corner.y + viewportBox.worldScreenHeight > source_y
  ) {
    return true;
  } else {
    return false;
  }
};
