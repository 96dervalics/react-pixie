import { Graphics } from "@inlet/react-pixi";
import { useContext, useState } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { ViewportContext } from "./ViewportContext";

const Rectangle = ({ x, y, width, height, onClick }) => {
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

export const AnimatedRectangle = ({
  x,
  y,
  c_width,
  height,
  viewport,
  onClick,
  id
}) => {
  const onOpenChange = () => {
    console.log("Child component " + id + ", open: " + open);
    onClick({ id: id, open: open });
  };

  const [open, setOpen] = useState(true);
  const { viewportBox } = useContext(ViewportContext);
  const click = () => {
    setOpen(!open);
    onOpenChange();
  };
  const AnimatedRectangle = animated(Rectangle);
  const props = useSpring({ width: open ? c_width : c_width });

  return open ? (
    IsInViewport(viewportBox, x, y, c_width, height) ? (
      <AnimatedRectangle
        x={x}
        y={y}
        width={props.width}
        height={height}
        onClick={click}
      ></AnimatedRectangle>
    ) : null
  ) : IsInViewport(viewportBox, x, y, c_width, height) ? (
    <AnimatedRectangle
      x={x}
      y={y}
      width={props.width}
      height={height}
      onClick={click}
    ></AnimatedRectangle>
  ) : null;
};

const IsInViewport = (viewportBox, x, y, width, height) => {
  const border_margin = 5;
  if (
    viewportBox.corner.x < x + width + height * 2 + border_margin &&
    viewportBox.corner.x + viewportBox.worldScreenWidth >
      x - width - border_margin &&
    viewportBox.corner.y < y + height + border_margin &&
    viewportBox.corner.y + viewportBox.worldScreenHeight >
      y - height - border_margin
  ) {
    return true;
  } else {
    return false;
  }
};
