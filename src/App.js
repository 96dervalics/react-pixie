import { Stage } from "@inlet/react-pixi";
import React from "react";
import * as PIXI from "pixi.js";
import { AnimatedRectangle } from "./Rectangle";
import { AnimatedDonut } from "./Donut";
import MyViewport from "./MyViewport";

const width = 1000;
const height = 600;
export function App() {
  let circles = [];
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
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
      <MyViewport>
        <AnimatedRectangle
          x={500}
          y={100}
          closeWidth={100}
          openWidth={200}
          height={100}
        ></AnimatedRectangle>
        <AnimatedRectangle
          x={500}
          y={400}
          closeWidth={100}
          openWidth={200}
          height={100}
        ></AnimatedRectangle>
        {circles}
      </MyViewport>
    </Stage>
  );
}
