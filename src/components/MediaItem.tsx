import { Fab, Tooltip } from "@mui/material";
import Chooser from "./Chooser";
import ChooserActions from "./ChooserActions";
import ImageCard from "./ImageCard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "./DeleteIcon";

export function MediaItem({ item, config, handleRemove, handleSelectImage, ...other }) {
  return (
   
    <Chooser {...other}>
       
      <ImageCard
        src={`${item?.files?.webImage?.url || item?.files?.thumbnail?.url || item?.originalUrl}`}
        label={item.name || ""}
      />
      
        <Tooltip title={item?.name} arrow placement="top" followCursor={true}>
      <span>
      <ChooserActions>
        <Tooltip title='Open in Bynder' arrow>
          <Fab
            onClick={() => {
              window.open(`${item?.url || config.portal.url}/media/?mediaId=${item.databaseId}&viewType=grid`, "_blank", "noreferrer");
            }}
          >
            <OpenInNewIcon />
          </Fab>
        </Tooltip>
        <Tooltip title='Swap Asset' arrow>
          <Fab
            onClick={() => {
              handleSelectImage();
            }}
          >
            <SwapHorizIcon />
          </Fab>
        </Tooltip>
        <Tooltip title='Remove Asset' arrow>
          <Fab onClick={() => handleRemove(item)}>
            <DeleteIcon />
          </Fab>
        </Tooltip>
      </ChooserActions>
      </span>
        </Tooltip>
    </Chooser>
  );
}
