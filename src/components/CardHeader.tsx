import { styled } from "@mui/system";
import React, { PropsWithChildren } from "react";

export type CardHeaderProps = PropsWithChildren<{}>;

const Root = styled("div")(({ theme }: any) => ({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap" as "nowrap",
  overflow: "hidden",
  ...theme.typography.subtitle1,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: 35,
  padding: "10px 10px 0",
}));

function CardHeader(props: CardHeaderProps) {
  const { children, ...other } = props;

  return <Root {...other}>{children}</Root>;
}

export default CardHeader;
