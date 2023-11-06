import { styled } from "@mui/system";
import React, { PropsWithChildren } from "react";

export type ChooserProps = PropsWithChildren<any>;

const Root = styled("div")({
  display: "block",
  transition: "all 0.4s ease",
  width: "32%",
  "min-width": "220px",
  "max-width": "350px",
  margin: "0 10px 10px 0",
  position: "relative" as "relative",
  "&:before": {
    content: "''",
    display: "block",
    "padding-top": "100%",
  },
});

const ContentWrapper = styled("div")({
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

function Chooser(props: ChooserProps) {
  const { children, ...other } = props;

  return (
    <Root {...other}>
      <ContentWrapper>{children}</ContentWrapper>
    </Root>
  );
}

export default Chooser;
