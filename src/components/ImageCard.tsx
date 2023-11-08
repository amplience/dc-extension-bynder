import { styled } from "@mui/system";
import React, { PropsWithChildren } from "react";
import Card from "./Card";
import CardHeader from "./CardHeader";

export type ImageCardProps = PropsWithChildren<{
  label: string;
  src: string;
}>;

function ImageCard(props: ImageCardProps) {
  const { src, label, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader>{label}</CardHeader>
      <div style={{
        width: "80%",
        height: "80%",
        margin: "0 auto",
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%",
      }}>
      </div>
    </Card>
  );
}

export default ImageCard;
