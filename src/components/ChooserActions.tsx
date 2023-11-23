import { styled } from "@mui/system";
import React, { PropsWithChildren } from "react";

export type ChooserActionsProps = PropsWithChildren<{
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

  fill: "#fff",
  "&:hover": {
    backgroundColor: "rgba(41,51,63,.8)",
    "& .MuiFab-root": {
      opacity: 1,
    },
  },
  "& .MuiFab-root": {
    opacity: 0,
    color: "#fff",
    backgroundColor: "#ccc",
  },

  "&:hover $content": {
    display: "inherit",
  },

  "& button": {
    margin: "3px",
  },
}));

const ContentWrapper = styled("div")({});

function ChooserActions(props: ChooserActionsProps) {
  const { children, ...other } = props;

  return (
    <Root {...other}>
      <ContentWrapper>{children}</ContentWrapper>
    </Root>
  );
}

export default ChooserActions;
