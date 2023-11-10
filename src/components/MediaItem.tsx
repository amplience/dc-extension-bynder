import { Fab } from "@mui/material";
import Chooser from "./Chooser";
import ChooserActions from "./ChooserActions";
import ImageCard from "./ImageCard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "./DeleteIcon";

export function MediaItem({ item, config, handleRemove, handleSelectImage, ...other }) {
  return (
    <Chooser {...other} title={item?.name}>
      <ImageCard
        src={`${item?.files?.webImage?.url || item?.files?.thumbnail?.url || item?.originalUrl}`}
        label={item.name || ""}
      />
      <ChooserActions>
        <Fab
          onClick={() => {
            window.open(`${config.portal.url}/media/?mediaId=${item.databaseId}&viewType=grid`, "_blank", "noreferrer");
          }}
        >
          <OpenInNewIcon />
        </Fab>
        <Fab
          onClick={() => {
            handleRemove(item);
            handleSelectImage();
          }}
        >
          <SwapHorizIcon />
        </Fab>
        <Fab onClick={() => handleRemove(item)}>
          <DeleteIcon />
        </Fab>
      </ChooserActions>
    </Chooser>
  );
}
