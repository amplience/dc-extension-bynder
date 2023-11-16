import { Fab } from "@mui/material";
import Chooser from "./Chooser";
import ChooserActions from "./ChooserActions";
import ImageCard from "./ImageCard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "./DeleteIcon";
import Tooltip from "./Tooltip";

const defaultDerivatives = ["webImage", "thumbnail", "mini"];

export function MediaItem({ item, cardImages = [], config, handleRemove, handleReplace, ...other }) {
  const cardImage = [...cardImages, ...defaultDerivatives].find((images) => item?.files[images]);

  return (
    <Tooltip title={item?.name}>
      <div>
        <Chooser {...other}>
          <ImageCard src={item?.files[cardImage]?.url ?? item?.originalUrl} label={item.name || ""} />
          <ChooserActions>
            <Tooltip title="Open in Bynder">
              <Fab
                onClick={() => {
                  window.open(
                    `${item?.url || config.portal.url}/media/?mediaId=${item.databaseId}&viewType=grid`,
                    "_blank",
                    "noreferrer",
                  );
                }}
              >
                <OpenInNewIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Swap Asset">
              <Fab
                onClick={() => {
                  handleReplace();
                }}
              >
                <SwapHorizIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Remove Asset">
              <Fab onClick={() => handleRemove(item)}>
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </ChooserActions>
        </Chooser>
      </div>
    </Tooltip>
  );
}
