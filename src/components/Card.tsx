import { styled } from "@mui/system";
import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{}>;

const Card = styled("div")({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  boxShadow: "0 1px 5px 0 rgba(23,32,44,.2), 0 2px 2px 0 rgba(23,32,44,.1), 0 3px 1px -2px rgba(23,32,44,.1)",
});

export default Card;
