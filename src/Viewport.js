import { Viewport } from "pixi-viewport";
import { PixiComponent } from "@inlet/react-pixi";

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

    viewport.drag().pinch().wheel().decelerate();
    return viewport;
  }
});
