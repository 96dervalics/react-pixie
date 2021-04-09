import { Graphics } from "@inlet/react-pixi";
import { useContext, useState } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { ViewportContext } from "./ViewportContext";

const Rectangle = ({ x, y, width, height, onClick }) => {
  const { viewport } = useContext(ViewportContext);
  console.log(viewport.worldScreenWidth);

  let radius = height / 2;

  const draw = (graphic) => {
    graphic.clear();

    graphic.beginFill(0xffce07);
    graphic.arc(x, y, radius, Math.PI / 2, (3 * Math.PI) / 2);
    graphic.endFill();

    graphic.beginFill(0xffce07);
    graphic.drawRect(x, y - radius, width, height);
    graphic.endFill();
    graphic.interactive = true;
    graphic.hitArea = new PIXI.Rectangle(
      x - radius,
      y - radius,
      width + height,
      height
    );
    graphic.click = onClick;

    graphic.beginFill(0xffce07);
    graphic.arc(x + width, y, radius, -Math.PI / 2, (1 * Math.PI) / 2);
    graphic.endFill();
  };

  return <Graphics draw={draw} />;
};

export const AnimatedRectangle = ({ x, y, closeWidth, openWidth, height }) => {
  const [open, setOpen] = useState(false);
  const click = () => setOpen(!open);
  const AnimatedRectangle = animated(Rectangle);
  const props = useSpring({ width: open ? closeWidth : openWidth });
  return (
    <AnimatedRectangle
      x={x}
      y={y}
      width={props.width}
      height={height}
      onClick={click}
    ></AnimatedRectangle>
  );
};
