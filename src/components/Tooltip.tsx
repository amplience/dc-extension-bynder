import { Tooltip as MuiTooltip } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

export type TooltipProps = PropsWithChildren<{
  children: ReactElement;
  title: string;
}>;

function Tooltip({ children, title }: TooltipProps) {
  return (
    <MuiTooltip
      title={title}
      arrow
      placement="top"
      enterDelay={800}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#000",
            fontSize: 12,
          },
        },
        arrow: {
          sx: {
            color: "#000",
          },
        },
      }}
    >
      {children}
    </MuiTooltip>
  );
}

export default Tooltip;
