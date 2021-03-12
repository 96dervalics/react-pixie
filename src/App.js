import { Stage, Graphics, Container } from "@inlet/react-pixi";
import { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { AnimatedRectangle } from "./AnimatedRectangle";
import { AnimatedDonut } from "./Donut";

const width = 1980;
const height = 1080;

// const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export function App() {
  // const [degree, setDegree] = useState(0);
  // setTimeout(() => {
  //   setDegree(random(0, 360));
  // });

  let circles = [];
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 8; j++) {
      circles.push(
        <AnimatedDonut
          x={i * 100 + 50}
          y={j * 100 + 50}
          radius={40}
        ></AnimatedDonut>
      );
    }
  }

  return (
    <Stage
      width={width}
      height={height}
      options={{ antialias: true, backgroundColor: 0xeef1f5 }}
    >
      <AnimatedRectangle
        x={1500}
        y={100}
        closeWidth={100}
        openWidth={200}
        height={100}
      ></AnimatedRectangle>
      <AnimatedRectangle
        x={1500}
        y={400}
        closeWidth={100}
        openWidth={200}
        height={100}
      ></AnimatedRectangle>
      <AnimatedRectangle
        x={1500}
        y={700}
        closeWidth={100}
        openWidth={200}
        height={100}
      ></AnimatedRectangle>
      {circles}
    </Stage>
  );
}
