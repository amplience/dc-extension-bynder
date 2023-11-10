import React, { useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";
import { serialize } from "../utils/serialize";
import { ContentMapping, contentMapper } from "../utils/content-mapper";
import { normaliseInitialValue } from "../utils/initial-value";

function BynderExtension() {
  const sdk = useContentFieldExtension();
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState(normaliseInitialValue(sdk.initialValue));

  // @ts-ignore
  const { bynderConfig: installedBynderConfig, contentMapping: installedMappings } = {
    ...sdk.params.installation,
    ...sdk.params.instance,
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

  const bynderConfig = {
    ...(installedBynderConfig ? installedBynderConfig : {}),
    theme: {
      colorButtonPrimary: "#3380FF",
    },
    onSuccess: function (assets) {
      const mappedAssets = contentMapping
        ? assets?.map((asset) => serialize(contentMapper(asset, contentMapping)))
        : assets;
      updateItems(mappedAssets);
      setOpenDialog(false);
    },
    onLogout: undefined,
    authentication: undefined,
  };

  const multiSelectEnabled = bynderConfig.mode === "MultiSelect";

  const updateItems = (items) => {
    setItems(items);
    setField(items);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.databaseId !== id);
    setItems(updatedItems);
    setField(updatedItems);
  };

  const setField = (items) => {
    if (multiSelectEnabled) {
      sdk.field.setValue(items);
    } else {
      sdk.field.setValue(items[0]);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    const selectedAssets = items.map((item) => item.databaseId);
    (window as any).BynderCompactView.open({
      ...bynderConfig,
      selectedAssets,
    });
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
          items={items}
          readOnly={sdk.readOnly}
          schema={sdk.field.schema}
          onBrowse={handleOpenDialog}
          onUpdate={updateItems}
          onRemove={removeItem}
          multiSelect={multiSelectEnabled}
        />
      </div>
    </div>
  );
}

export default BynderExtension;
