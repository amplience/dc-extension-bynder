import React from "react";
import { Fab } from "@mui/material";
import Chooser from "./Chooser";
import ImageCard from "./ImageCard";
import ChooserActions from "./ChooserActions";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "./DeleteIcon";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useContentFieldExtension } from "./WithFieldExtension";

export type ImageFieldProps = {
  value?: any;
  schema?: any;
  readOnly?: boolean;
  style?: any;
  onChange?: (newValue: any) => void;
  onBrowse?: () => void;
};

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

function BynderImageField(props: ImageFieldProps) {
  const { value, schema, readOnly, onChange, onBrowse, ...other } = props;

  const sdk = useContentFieldExtension();

  //@ts-ignore
  const { bynderConfig: installedBynderConfig } = {
    ...sdk.params.installation,
    ...sdk.params.instance,
  };

  const hasValue = value != null && !isObjectEmpty(value);

  const handleDelete = () => {
    if (onChange) {
      onChange(null);
    }
  };

  const handleSelectImage = async () => {
    try {
      onBrowse();
    } catch (err) {}
  };

  return (
    <Chooser {...other}>
      {hasValue && (
        <ImageCard
          src={`${value?.files?.webImage?.url || value?.files?.thumbnail?.url || value?.originalUrl}`}
          label={value.name || ""}
        />
      )}
      <ChooserActions populated={hasValue}>
        {hasValue && (
          <>
            <Fab
              onClick={() => {
                window.open(
                  `${installedBynderConfig.portal.url}/media/?mediaId=${value.databaseId}`,
                  "_blank",
                  "noreferrer",
                );
              }}
            >
              <OpenInNewIcon />
            </Fab>
            <Fab
              onClick={() => {
                handleDelete();
                handleSelectImage();
              }}
            >
              <SwapHorizIcon />
            </Fab>
            <Fab onClick={handleDelete}>
              <DeleteIcon />
            </Fab>
          </>
        )}

        {!hasValue && (
          <Fab onClick={handleSelectImage}>
            <AddIcon fontSize="large" />
          </Fab>
        )}
      </ChooserActions>
    </Chooser>
  );
}

export default BynderImageField;
