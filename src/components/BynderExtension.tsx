import React, { useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";
import { serialize } from "../utils/serialize";
import { ContentMapping, contentMapper } from "../utils/content-mapper";

function BynderExtension() {
  const sdk = useContentFieldExtension();
  const [value, setValue] = useState(sdk.initialValue);
  const [openDialog, setOpenDialog] = useState(false);

  //@ts-ignore
  const { bynderConfig: installedBynderConfig, contentMapping: installedMappings } = {
    ...sdk.params.installation,
    ...sdk.params.instance,
  };

  const bynderConfig = {
    ...(installedBynderConfig ? installedBynderConfig : {}),
    theme: {
      colorButtonPrimary: "#3380FF",
    },
    mode: "SingleSelectFile",
    onSuccess: function (assets, additionalInfo) {
      handleChange(assets[0]);
      setOpenDialog(false);
    },
    onLogout: undefined,
    authentication: undefined,
  };

  const defaultMapping: ContentMapping = {
    name: { jsonPath: "$.name" },
    files: { jsonPath: "$.files" },
    databaseId: { jsonPath: "$.databaseId" },
    url: { jsonPath: "$.url" },
  };

  const contentMapping: ContentMapping = installedMappings
    ? {
        ...installedMappings,
        ...defaultMapping,
      }
    : null;

  const handleChange = (asset) => {
    const mappedAsset = contentMapping ? contentMapper(asset, contentMapping) : asset;
    const serializedAsset = serialize(mappedAsset);
    setValue(serializedAsset);
    sdk.field.setValue(serializedAsset);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);

    (window as any).BynderCompactView.open(bynderConfig);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: openDialog ? 600 : 300,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <BynderImageField
          value={value}
          readOnly={sdk.readOnly}
          schema={sdk.field.schema}
          style={{ minWidth: "33%" }}
          onBrowse={handleOpenDialog}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default BynderExtension;
