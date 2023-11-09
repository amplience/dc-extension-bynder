import React from "react";
import { Box, Fab, Stack } from "@mui/material";
import Chooser from "./Chooser";
import ImageCard from "./ImageCard";
import ChooserActions from "./ChooserActions";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "./DeleteIcon";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useContentFieldExtension } from "./WithFieldExtension";
import { useItems, useItemsDispatch } from "../context/ItemsContext";
import AddAction from "./AddAction";

export type ImageFieldProps = {
  schema?: any;
  readOnly?: boolean;
  style?: any;
  onBrowse?: () => void;
  multiSelect: boolean;
};

function BynderImageField(props: ImageFieldProps) {
  const { schema, readOnly, onBrowse, multiSelect, ...other } = props;

  const sdk = useContentFieldExtension();
  const items = useItems();
  const itemsDispatch = useItemsDispatch();

  //@ts-ignore
  const { bynderConfig: installedBynderConfig } = {
    ...sdk.params.installation,
    ...sdk.params.instance,
  };

  const handleRemove = (item) => {
    itemsDispatch({
      type: "remove",
      item,
    });
  };

  const handleSelectImage = async () => {
    try {
      onBrowse();
    } catch (err) {}
  };

  return (
    <Stack direction={"row"}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          p: 1,
        }}
      >
        {items.map((item, index) => (
          <Box sx={{ mt: 1, ml: 1, mr: 1 }} style={{ position: "relative", cursor: "grab" }} key={index}>
            <Chooser {...other} title={item?.name}>
              <ImageCard
                src={`${item?.files?.webImage?.url || item?.files?.thumbnail?.url || item?.originalUrl}`}
                label={item.name || ""}
              />
              <ChooserActions>
                <Fab
                  onClick={() => {
                    window.open(
                      `${installedBynderConfig.portal.url}/media/?mediaId=${item.databaseId}&viewType=grid`,
                      "_blank",
                      "noreferrer",
                    );
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
          </Box>
        ))}
        {(multiSelect || !items.length) && (
          <Box sx={{ mt: 1, ml: 1, mr: 1 }} style={{ position: "relative" }}>
            <Chooser {...other}>
              <AddAction>
                <Fab onClick={handleSelectImage} style={{ backgroundColor: "#ccc" }}>
                  <AddIcon fontSize="large" style={{ color: "#fff" }} />
                </Fab>
              </AddAction>
            </Chooser>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

export default BynderImageField;
