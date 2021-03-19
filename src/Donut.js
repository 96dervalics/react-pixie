import { Graphics } from "@inlet/react-pixi";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { Point } from "pixi.js";

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

  // return Math.random() < 0.5 ? null : <Graphics draw={draw} />;
  return <Graphics draw={draw} />;
};

export const AnimatedDonut = ({ x, y, radius }) => {
  const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  let rand = random(0, 360);
  const [status, setStatus] = useState(false);

  let timeout = random(5000, 10000);
  setTimeout(function () {
    setStatus(!status);
  }, timeout);

  const click = () => setStatus(!status);
  const AnimatedDonut = animated(Donut);
  const props = useSpring({
    degree: status ? rand : rand,
    from: { degree: 0 }
  });
  return (
    <AnimatedDonut
      x={x}
      y={y}
      radius={radius}
      degree={props.degree}
      onClick={click}
    ></AnimatedDonut>
  );
};
