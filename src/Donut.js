import { Graphics } from "@inlet/react-pixi";
import { useContext, useState } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { Point } from "pixi.js";
import { ViewportContext } from "./ViewportContext";

const Donut = ({ x, y, radius, degree, onClick }) => {
  let startPoint = new Point({
    x: Math.cos(degree) * radius,
    y: Math.sin(degree) * radius
  });

  const draw = (graphic) => {
    graphic.clear();
    graphic.lineStyle(5, 0xffce07, 1);
    graphic.drawCircle(x, y, radius - 10);
    graphic.moveTo(x + startPoint.x, y + startPoint.y);
    graphic.arc(x, y, radius, 0, degree * (Math.PI / 180));
    graphic.interactive = true;
    graphic.hitArea = new PIXI.Circle(x, y, radius);
    graphic.click = onClick;
  };

  return <Graphics draw={draw} />;
};

export const AnimatedDonut = ({ x, y, radius }) => {
  const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  let rand = random(0, 360);
  const [status, setStatus] = useState(false);
  const { viewportBox } = useContext(ViewportContext);

  let timeout = random(5000, 10000);
  setTimeout(function () {
    if (IsInViewport(viewportBox, x, y, radius)) {
      setStatus(!status);
    }
  }, timeout);

  const click = () => setStatus(!status);
  const AnimatedDonut = animated(Donut);
  const props = useSpring({
    degree: status ? rand : rand,
    from: { degree: 0 }
  });
  return IsInViewport(viewportBox, x, y, radius) ? (
    <AnimatedDonut
      x={x}
      y={y}
      radius={radius}
      degree={props.degree}
      onClick={click}
    ></AnimatedDonut>
  ) : null;
};

const IsInViewport = (viewportBox, x, y, radius) => {
  const border_margin = 15;
  if (
    viewportBox.corner.x < x + radius + border_margin &&
    viewportBox.corner.x + viewportBox.worldScreenWidth >
      x - radius - border_margin &&
    viewportBox.corner.y < y + radius + border_margin &&
    viewportBox.corner.y + viewportBox.worldScreenHeight >
      y - radius - border_margin
  ) {
    return true;
  } else {
    return false;
  }
};
