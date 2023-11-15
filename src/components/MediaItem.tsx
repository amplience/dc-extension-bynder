import { Fab } from "@mui/material";
import Chooser from "./Chooser";
import ChooserActions from "./ChooserActions";
import ImageCard from "./ImageCard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "./DeleteIcon";
import Tooltip from "./Tooltip";
import { useEffect, useState } from "react";

const defaultDerivatives = ["webImage", "thumbnail", "mini"];

export function MediaItem({ item, cardImages = [], config, handleRemove, handleReplace, ...other }) {
  const [finalCardImage, setFinalCardImage] = useState(item?.originalUrl);
  cardImages = [...cardImages, ...defaultDerivatives];

  useEffect(() => {
    // Get card image using fallback
    for (var i = 0; i < cardImages.length; ++i) {
      if (item?.files[cardImages[i]]?.url) {
        setFinalCardImage(item.files[cardImages[i]].url);
        break;
      }
    }
  }, [cardImages, item]);

  return (
    <Tooltip title={item?.name}>
      <div>
        <Chooser {...other}>
          <ImageCard
            src={finalCardImage}
            label={item.name || ""}
          />
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
