import Svg, { Rect } from "react-native-svg";

const stripeSvg = (
  <Svg width="10" height="10" viewBox="0 0 10 10">
    <Rect width="10" height="5" fill="#e0e0e0" />
    <Rect y="5" width="10" height="5" fill="#ffffff" />
  </Svg>
);

export const stripeUri = stripeSvg;
