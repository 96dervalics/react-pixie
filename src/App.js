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
  // flextree testing
  const layout = flextree();
  layout.spacing(400);
  const tree = layout.hierarchy({
    size: [55, 110],
    type: "circle",
    children: [
      {
        size: [200, 155],
        type: "rectangle",
        children: [{ size: [55, 110], type: "circle" }]
      },
      {
        size: [55, 110],
        type: "circle",
        children: [
          { size: [200, 155], type: "rectangle" },
          { size: [200, 155], type: "rectangle" }
        ]
      }
    ]
  });
  layout(tree);

  let elements = [];
  tree.each((node) => {
    //console.log(`(${node.x}, ${node.y})`);
    console.log(node);

    if (node.data.type === "circle") {
      elements.push(
        <AnimatedDonut x={node.x} y={node.y} radius={40}></AnimatedDonut>
      );
    } else if (node.data.type === "rectangle") {
      elements.push(
        <AnimatedRectangle
          x={node.x}
          y={node.y}
          closeWidth={100}
          openWidth={200}
          height={100}
        ></AnimatedRectangle>
      );
    }
  });

  console.log(elements);

  // let circles = [];
  // for (let i = 0; i <= 10; i++) {
  //   for (let j = 0; j <= 10; j++) {
  //     circles.push(
  //       <AnimatedDonut
  //         x={i * 400 + 50}
  //         y={j * 400 + 50}
  //         radius={40}
  //       ></AnimatedDonut>
  //     );
  //   }
  // }

  return (
    <Stage
      width={width}
      height={height}
      options={{ antialias: true, backgroundColor: 0xeef1f5 }}
    >
      <ViewportProvider>
        <MyViewport>
          {(viewport) => (
            <>
              {elements}
              {/* <AnimatedDonut x={0} y={0} radius={40} />
              <AnimatedRectangle
                x={-228}
                y={100}
                closeWidth={100}
                openWidth={200}
                height={100}
                viewport={viewport}
              />
              <AnimatedDonut x={373} y={100} radius={40} />
              <AnimatedDonut x={-228} y={300} radius={40} />
              <AnimatedRectangle
                x={173}
                y={210}
                closeWidth={100}
                openWidth={200}
                height={100}
                viewport={viewport}
              />
              <AnimatedRectangle
                x={573}
                y={210}
                closeWidth={100}
                openWidth={200}
                height={100}
                viewport={viewport}
              /> */}
            </>
          )}
        </MyViewport>
      </ViewportProvider>
    </Stage>
  );
}
