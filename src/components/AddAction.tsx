import { styled } from "@mui/system";
import React, { PropsWithChildren } from "react";

export type AddActionProps = PropsWithChildren<{
  populated?: boolean;
}>;

const Root = styled("div")(() => ({
  transition: "all .3s",
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  fill: "#e5e5e5",
  border: "1px solid #e5e5e5",

  "&:hover": {
    fill: "#c9cccf",
  },

  "& .MuiFab-root": {
    backgroundColor: "#fff",
  },

  "&:hover $content": {
    display: "inherit",
  },

  "& button": {
    margin: "3px",
  },
}));

const ContentWrapper = styled("div")({});

function AddAction(props: AddActionProps) {
  const { children, ...other } = props;

  return (
    <Root {...other}>
      <ContentWrapper>{children}</ContentWrapper>
    </Root>
  );
}

export default AddAction;
