import { styled } from "@mui/system";
import React, { PropsWithChildren } from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";

export type ImageCardProps = PropsWithChildren<{
  label: string;
  src: string;
}>;

const Image = styled("img")({
  display: "block",
  verticalAlign: "middle" as "middle",
  boxSizing: "border-box" as "border-box",
  padding: "0 10px",
  position: "relative" as "relative",
  top: 0,
  left: 0,
  maxHeight: "100%",
  width: "100%",
});

function ImageCard(props: ImageCardProps) {
  const { src, label, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader>{label}</CardHeader>
      <div style={{ position: "relative" }}>
        <Image src={src} alt={label} title={label} />
      </div>
    </Card>
  );
}

export default ImageCard;
