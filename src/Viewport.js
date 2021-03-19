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

    viewport.drag().pinch().wheel().decelerate();
    //viewport.scaled = 0.5;
    //viewport.rotation = 40;

    return viewport;
  }
});
