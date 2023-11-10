import React, { useEffect, useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";
import { serialize } from "../utils/serialize";
import { ContentMapping, contentMapper } from "../utils/content-mapper";
import { useItems, useItemsDispatch } from "../context/ItemsContext";

function BynderExtension() {
  const sdk = useContentFieldExtension();
  const [openDialog, setOpenDialog] = useState(false);
  const items = useItems();
  const itemsDispatch = useItemsDispatch();

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
    onSuccess: function (assets) {
      handleChange(assets);
      setOpenDialog(false);
    },
    onLogout: undefined,
    authentication: undefined,
  };

  const multiSelectEnabled = bynderConfig.mode === "MultiSelect";

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

  useEffect(() => {
    if (multiSelectEnabled) {
      sdk.field.setValue(items);
    } else {
      sdk.field.setValue(items[0]);
    }
  }, [items, multiSelectEnabled, sdk.field]);

  const handleChange = (newItems: Record<string, any>[]) => {
    if (!newItems) {
      return;
    }
    const mappedItems = contentMapping
      ? newItems?.map((item) => serialize(contentMapper(item, contentMapping)))
      : newItems;

    if (multiSelectEnabled) {
      itemsDispatch({
        type: "add",
        items: mappedItems,
      });
    } else {
      itemsDispatch({
        type: "add",
        items: [mappedItems[0]],
      });
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    const selectedAssets = items.map((item) => item.databaseId);
    (window as any).BynderCompactView.open({ ...bynderConfig, selectedAssets });
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
          readOnly={sdk.readOnly}
          schema={sdk.field.schema}
          onBrowse={handleOpenDialog}
          multiSelect={multiSelectEnabled}
        />
      </div>
    </div>
  );
}

export default BynderExtension;
