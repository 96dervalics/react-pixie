import { Stage, Graphics, Container } from "@inlet/react-pixi";
import { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";
import { AnimatedRectangle } from "./AnimatedRectangle";
import { AnimatedDonut } from "./Donut";
import { Viewport } from "pixi-viewport";

// const width = 200;
// const height = 200;

const app = new PIXI.Application();
document.body.appendChild(app.view);

// create viewport
const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,
  interaction: app.renderer.plugins.interaction
});

// add the viewport to the stage
app.stage.addChild(viewport);

// activate plugins
viewport.drag().pinch().wheel().decelerate();

// add a red box
const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
sprite.tint = 0xff0000;
sprite.width = sprite.height = 100;
sprite.position.set(100, 100);

// export function App() {
//   // const [degree, setDegree] = useState(0);
//   // setTimeout(() => {
//   //   setDegree(random(0, 360));
//   // });

//   let circles = [];
//   for (let i = 0; i <= 10; i++) {
//     for (let j = 0; j <= 8; j++) {
//       circles.push(
//         <AnimatedDonut
//           x={i * 100 + 50}
//           y={j * 100 + 50}
//           radius={40}
//         ></AnimatedDonut>
//       );
//     }
//   }

//   return (
//     <Stage
//       width={width}
//       height={height}
//       options={{ antialias: true, backgroundColor: 0xeef1f5 }}
//     >
//       <AnimatedRectangle
//         x={1500}
//         y={100}
//         closeWidth={100}
//         openWidth={200}
//         height={100}
//       ></AnimatedRectangle>
//       <AnimatedRectangle
//         x={1500}
//         y={400}
//         closeWidth={100}
//         openWidth={200}
//         height={100}
//       ></AnimatedRectangle>
//       <AnimatedRectangle
//         x={1500}
//         y={700}
//         closeWidth={100}
//         openWidth={200}
//         height={100}
//       ></AnimatedRectangle>
//       {circles}
//     </Stage>
//   );
// }
