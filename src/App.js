import { Stage, Graphics, Container } from "@inlet/react-pixi";
import { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { AnimatedRectangle } from "./AnimatedRectangle";
import { AnimatedDonut, Donut } from "./Donut";

const width = 700;
const height = 400;

const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export function App() {
  const [degree, setDegree] = useState(0);
  setTimeout(() => {
    setDegree(random(0, 360));
  });
  return (
    <Stage
      width={width}
      height={height}
      options={{ antialias: true, backgroundColor: 0xeef1f5 }}
    >
      {/* <AnimatedRectangle></AnimatedRectangle> */}
      <AnimatedDonut degree={degree}></AnimatedDonut>
    </Stage>
  );
}
