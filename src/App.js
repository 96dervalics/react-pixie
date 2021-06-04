import { Stage } from "@inlet/react-pixi";
import React, { useState } from "react";
import * as PIXI from "pixi.js";
import { AnimatedRectangle } from "./Rectangle";
import { AnimatedDonut } from "./Donut";
import { AnimatedConnection } from "./Connection";
import MyViewport from "./MyViewport";
import { ViewportProvider } from "./ViewportContext";
import { flextree } from "d3-flextree";
import { tree_data } from "./tree_test";
import { useSpring, animated } from "react-spring";

const width = 1000;
const height = 600;
const horisontalSpacing = 200 + 100;
const verticalSpacing = 100 + 50;

let widthMap = new Map([
  [1, 50],
  [2, 50],
  [3, 50],
  [4, 50],
  [5, 50],
  [6, 50],
  [7, 50],
  [8, 50],
  [9, 50],
  [10, 50],
  [11, 50],
  [12, 50],
  [13, 50],
  [14, 50],
  [15, 50],
  [16, 50],
  [17, 50]
]);

let data_tree = {
  id: 1,
  size: [widthMap.get(1), 55],
  type: "circle",
  children: [
    {
      id: 2,
      size: [widthMap.get(2), 100],
      type: "rectangle",
      children: [
        { id: 3, size: [widthMap.get(3), 55], type: "circle" },
        { id: 4, size: [widthMap.get(4), 55], type: "circle" }
      ]
    },
    {
      id: 5,
      size: [widthMap.get(5), 55],
      type: "circle",
      children: [
        {
          id: 6,
          size: [widthMap.get(6), 100],
          type: "rectangle",
          children: [
            { id: 7, size: [widthMap.get(7), 55], type: "circle" },
            { id: 8, size: [widthMap.get(8), 55], type: "circle" },
            { id: 9, size: [widthMap.get(9), 100], type: "rectangle" }
          ]
        },
        {
          id: 10,
          size: [widthMap.get(10), 100],
          type: "rectangle",
          children: [
            { id: 11, size: [widthMap.get(11), 100], type: "rectangle" },
            { id: 12, size: [widthMap.get(12), 55], type: "circle" },
            { id: 13, size: [widthMap.get(13), 100], type: "rectangle" }
          ]
        },
        {
          id: 14,
          size: [widthMap.get(14), 100],
          type: "rectangle",
          children: [
            { id: 15, size: [widthMap.get(15), 100], type: "rectangle" },
            { id: 16, size: [widthMap.get(16), 100], type: "rectangle" },
            { id: 17, size: [widthMap.get(17), 55], type: "circle" }
          ]
        }
      ]
    }
  ]
};

function searchInTree(obj, id) {
  if (obj.id === id) {
    return obj;
  } else if (obj.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < obj.children.length; i++) {
      result = searchInTree(obj.children[i], id);
    }
    return result;
  }
  return null;
}

export function App() {
  const [change, setChange] = useState(true);
  const layout = flextree();
  layout.spacing(horisontalSpacing);
  let elements = [];

  function onTreeChange(val) {
    console.log("Parent component: " + val.id + ", open:" + val.open);
    widthMap.set(val.id, val.open ? 300 : 50);
    // console.log(widthMap.get(val.id));
    // console.log(data_tree.children[0].id);
    // console.log(data_tree.children[0].size);
    let node = searchInTree(data_tree, val.id);
    node.size[0] = widthMap.get(val.id);
    // console.log(data_tree.children[0].id);
    // console.log(data_tree.children[0].size);
    // console.log(tree);
    tree = layout.hierarchy(data_tree);
    layout(tree);
    // console.log(tree);
    elements = constructTree(tree);
    setChange(!change);
  }

  function constructTree(tree) {
    let elements = [];
    tree.each((node) => {
      node.y += node.depth * verticalSpacing;

      if (node.data.type === "circle") {
        elements.push(
          <AnimatedDonut
            key={node.data.id}
            x={node.x}
            y={node.y}
            radius={40}
          ></AnimatedDonut>
        );
      } else if (node.data.type === "rectangle") {
        elements.push(
          <AnimatedRectangle
            id={node.data.id}
            onClick={onTreeChange.bind(this)}
            key={node.data.id}
            x={node.x}
            y={node.y}
            c_width={node.data.size[0]}
            //openWidth={node.data.size[0]}
            height={100}
          ></AnimatedRectangle>
        );
      }

      if (node.parent) {
        elements.push(
          <AnimatedConnection
            key={node.parent.data.id + "_" + node.data.id}
            source_x={node.parent.x}
            source_y={node.parent.y}
            target_x={node.x}
            target_y={node.y}
          ></AnimatedConnection>
        );
      }
    });

    return elements;
  }

  // const tree = layout.hierarchy(tree_data);
  // layout(tree);

  let tree = layout.hierarchy(data_tree);
  layout(tree);
  elements = constructTree(tree);

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
