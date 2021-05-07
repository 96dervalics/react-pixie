import { Stage } from "@inlet/react-pixi";
import React from "react";
import * as PIXI from "pixi.js";
import { AnimatedRectangle } from "./Rectangle";
import { AnimatedDonut } from "./Donut";
import MyViewport from "./MyViewport";
import { ViewportProvider } from "./ViewportContext";
import { flextree } from "d3-flextree";

const width = 1000;
const height = 600;

export function App() {
  const horisontalSpacing = 100 + 100;
  const verticalSpacing = 100 + 50;

  const layout = flextree();
  layout.spacing(horisontalSpacing);
  const tree = layout.hierarchy({
    size: [55, 110],
    type: "circle",
    children: [
      {
        size: [200, 100],
        type: "rectangle",
        children: [{ size: [55, 55], type: "circle" }]
      },
      {
        size: [55, 55],
        type: "circle",
        children: [
          {
            size: [200, 100],
            type: "rectangle",
            children: [
              { size: [55, 55], type: "circle" },
              { size: [55, 55], type: "circle" },
              { size: [200, 100], type: "rectangle" }
            ]
          },
          {
            size: [200, 100],
            type: "rectangle",
            children: [
              { size: [200, 100], type: "rectangle" },
              { size: [55, 55], type: "circle" },
              { size: [200, 100], type: "rectangle" }
            ]
          },
          {
            size: [200, 100],
            type: "rectangle",
            children: [
              { size: [200, 100], type: "rectangle" },
              { size: [200, 100], type: "rectangle" },
              { size: [55, 55], type: "circle" }
            ]
          }
        ]
      }
    ]
  });
  layout(tree);

  let elements = [];
  let key = 0;
  tree.each((node) => {
    node.y += node.depth * verticalSpacing;

    if (node.data.type === "circle") {
      elements.push(
        <AnimatedDonut
          key={key}
          x={node.x}
          y={node.y}
          radius={40}
        ></AnimatedDonut>
      );
    } else if (node.data.type === "rectangle") {
      elements.push(
        <AnimatedRectangle
          key={key}
          x={node.x}
          y={node.y}
          closeWidth={100}
          openWidth={200}
          height={100}
        ></AnimatedRectangle>
      );
    }
    key++;
  });

  return (
    <Stage
      width={width}
      height={height}
      options={{ antialias: true, backgroundColor: 0xeef1f5 }}
    >
      <ViewportProvider>
        <MyViewport>{(viewport) => <>{elements}</>}</MyViewport>
      </ViewportProvider>
    </Stage>
  );
}
