import { Stage, Graphics, Container } from "@inlet/react-pixi";
import { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { AnimatedRectangle } from "./AnimatedRectangle";
import { AnimatedDonut } from "./Donut";

const width = 700;
const height = 400;

// const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export function App() {
  // const [degree, setDegree] = useState(0);
  // setTimeout(() => {
  //   setDegree(random(0, 360));
  // });
  return (
    <Stage
      width={width}
      height={height}
      options={{ antialias: true, backgroundColor: 0xeef1f5 }}
    >
      <AnimatedRectangle
        x={200}
        y={50}
        closeWidth={100}
        openWidth={200}
        height={100}
      ></AnimatedRectangle>
      <AnimatedDonut x={200} y={300} radius={50}></AnimatedDonut>
    </Stage>
  );
}
