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
  const border_margin = 5;

  // left to right line
  // top => bot: source_y < target_y always

  if (
    viewportBox.corner.x < source_x + border_margin &&
    viewportBox.corner.x + viewportBox.worldScreenWidth >
      source_x - border_margin &&
    viewportBox.corner.y < source_y + border_margin &&
    viewportBox.corner.y + viewportBox.worldScreenHeight >
      source_y - border_margin
  ) {
    return true;
  } else if (
    viewportBox.corner.x < target_x + border_margin &&
    viewportBox.corner.x + viewportBox.worldScreenWidth >
      target_x - border_margin &&
    viewportBox.corner.y < target_y + border_margin &&
    viewportBox.corner.y + viewportBox.worldScreenHeight >
      target_y - border_margin
  ) {
    return true;
  } else {
    return false;
  }
};
