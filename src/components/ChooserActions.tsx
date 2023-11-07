import { styled } from "@mui/system";
import React, { PropsWithChildren } from "react";

export type ChooserActionsProps = PropsWithChildren<{
  populated?: boolean;
}>;

const Root = styled("div")(({ populated }: any) => ({
  transition: "all .3s",
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,

  display: "flex",
  "flex-direction": "row",
  "align-items": "center",
  "align-content": "center",
  "justify-content": "center",

  ...(populated
    ? {
        fill: "#fff",
        "&:hover": {
          "background-color": "rgba(41,51,63,.8)",
          "& .MuiFab-root": {
            opacity: 1,
          },
        },
        "& .MuiFab-root": {
          opacity: 0,
          color: "#fff",
          backgroundColor: "#ccc",
        },
      }
    : {
        "background-color": "#e5e5e5",
        fill: "#e5e5e5",

        "&:hover": {
          "background-color": "#c9cccf",
          fill: "#c9cccf",
        },

        "& .MuiFab-root": {
          backgroundColor: "#fff",
        },
      }),

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