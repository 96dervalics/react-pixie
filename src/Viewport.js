import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";
import { Point } from "pixi.js";

export default PixiComponent("Viewport", {
  create: (props) => {
    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 600,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction
    });

    viewport.on("drag-start", () => console.log("drag-start"));
    viewport.on("drag-end", () => console.log("drag-end"));
    viewport.on("moved", () =>
      console.log(
        "top-left corner: " +
          viewport.corner +
          " world screen width: " +
          viewport.worldScreenWidth +
          " world screen height: " +
          viewport.worldScreenHeight
      )
    );

    viewport.drag().pinch().wheel().decelerate();
    return viewport;
  }
});
