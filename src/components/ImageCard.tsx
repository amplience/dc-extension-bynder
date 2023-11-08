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
      <div style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%",
      }}>
        <CardHeader>{label}</CardHeader>
      </div>
    </Card>
  );
}

export default ImageCard;
