import { Stage, Graphics, Container } from "@inlet/react-pixi";
import { useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import * as PIXI from "pixi.js";

export const Donut = ({ degree }) => {
  const draw = useCallback((graphic) => {
    graphic.clear();
    graphic.beginFill(0xffce07);
    graphic.arc(50, 50, 50, 0, degree * (Math.PI / 180));
    graphic.endFill();
  });

  return <Graphics draw={draw} />;
};

export const AnimatedDonut = () => {
  const AnimatedDonut = animated(Donut);
  const props = useSpring({ degree: 360, from: { degree: 0 } });
  return <AnimatedDonut degree={props.degree}></AnimatedDonut>;
};
