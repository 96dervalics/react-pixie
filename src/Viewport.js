import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";

export default PixiComponent("Viewport", {
  create: (props) => {
    const viewport = new Viewport({
      screenWidth: 1000,
      screenHeight: 600,
      worldWidth: 1000,
      worldHeight: 600
      //ticker: props.app.ticker,
      //interaction: props.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    viewport.on("drag-start", () => console.log("drag-start"));
    viewport.on("drag-end", () => console.log("drag-end"));
    viewport.on("moved", () =>
      console.log(
        "top-left corner: " +
          viewport.corner +
          // " right: " +
          // viewport.right +
          // " bottom: " +
          // viewport.bottom +
          " world screen width: " +
          viewport.worldScreenWidth +
          " world screen height: " +
          viewport.worldScreenHeight
      )
    );

    viewport.drag().pinch().wheel().decelerate();
    //viewport.scaled = 0.5;
    //viewport.rotation = 40;
    return viewport;
  }
});
