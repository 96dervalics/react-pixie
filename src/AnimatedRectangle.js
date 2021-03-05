import { Stage, Graphics, Container } from "@inlet/react-pixi";
import { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";

const Rectangle = ({ x, y, width, height, onClick }) => {
  const draw = useCallback((graphic) => {
    graphic.clear();

    graphic.beginFill(0xffce07);
    graphic.arc(50, 50, 50, Math.PI / 2, (3 * Math.PI) / 2);
    graphic.endFill();

    graphic.beginFill(0xffce07);
    graphic.drawRect(50, 0, width, 100);
    graphic.endFill();
    graphic.interactive = true;
    graphic.hitArea = new PIXI.Rectangle(0, 0, width + 100, 100);
    graphic.click = onClick;

    graphic.beginFill(0xffce07);
    graphic.arc(width + 50, 50, 50, -Math.PI / 2, (1 * Math.PI) / 2);
    graphic.endFill();
  });

  return <Graphics draw={draw} />;
};

export const AnimatedRectangle = () => {
  const [open, setOpen] = useState(false);
  const click = () => setOpen(!open);
  const AnimatedRectangle = animated(Rectangle);
  const props = useSpring({ width: open ? 100 : 200 });
  return (
    <AnimatedRectangle
      x={100}
      y={100}
      width={props.width}
      onClick={click}
    ></AnimatedRectangle>
  );
};
