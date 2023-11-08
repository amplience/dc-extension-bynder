import React from "react";
import { Fab } from "@mui/material";
import Chooser from "./Chooser";
import ImageCard from "./ImageCard";
import ChooserActions from "./ChooserActions";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "./DeleteIcon";

export type ImageFieldProps = {
  value?: any;
  schema?: any;
  readOnly?: boolean;
  style?: any;
  onChange?: (newValue: any) => void;
  onBrowse?: () => void;
};

function BynderImageField(props: ImageFieldProps) {
  const { value, schema, readOnly, onChange, onBrowse, ...other } = props;

  const hasValue = value != null;

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
          <Fab onClick={handleDelete}>
            <DeleteIcon />
          </Fab>
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
