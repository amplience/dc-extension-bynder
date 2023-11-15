import React, { useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";
import { serialize } from "../utils/serialize";
import { ContentMapping, contentMapper } from "../utils/content-mapper";
import { normaliseInitialValue } from "../utils/initial-value";
import { FieldDetails } from "./FieldDetails";

enum Modes {
  SingleSelect = "SingleSelect",
  MultiSelect = "MultiSelect",
}

function BynderExtension() {
  const sdk = useContentFieldExtension();
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState(normaliseInitialValue(sdk.initialValue));

  // @ts-ignore
  const { bynderConfig: installedBynderConfig, amplienceConfig } = {
    ...sdk.params.installation,
    ...sdk.params.instance,
  };

  const defaultMapping: ContentMapping = {
    name: { jsonPath: "$.name" },
    files: { jsonPath: "$.files" },
    databaseId: { jsonPath: "$.databaseId" },
    url: { jsonPath: "$.url" },
  };

  const contentMapping: ContentMapping = amplienceConfig?.contentMapping
    ? {
        ...amplienceConfig?.contentMapping,
        ...defaultMapping,
      }
    : null;

  const bynderConfig = {
    ...(installedBynderConfig ? installedBynderConfig : {}),
    theme: {
      colorButtonPrimary: "#3380FF",
    },
    onSuccess: undefined,
    onLogout: undefined,
    authentication: undefined,
  };

  const multiSelectEnabled = bynderConfig.mode === Modes.MultiSelect;

  const cardImages: string[] = amplienceConfig?.cardImages;

  const updateItems = (items) => {
    setItems(items);
    setField(items);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.databaseId !== id);
    setItems(updatedItems);
    setField(updatedItems);
  };

  const replaceItem = (oldItem, newItem) => {
    const modifiedItems = items.map((item) => (item.databaseId === oldItem.databaseId ? newItem : item));
    setItems(modifiedItems);
    setField(modifiedItems);
  };

  const setField = async (items) => {
    try {
      const mappedItems = contentMapping ? items?.map((item) => serialize(contentMapper(item, contentMapping))) : items;
      if (multiSelectEnabled) {
        await sdk.field.setValue(mappedItems);
      } else {
        await sdk.field.setValue(mappedItems[0] || null);
      }
    } catch (e) {
      // noop - validation errors handled in DC
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    const selectedAssets = items.map((item) => item.databaseId);
    (window as any).BynderCompactView.open({
      ...bynderConfig,
      selectedAssets,
      onSuccess: (assets) => {
        updateItems(assets);
        setOpenDialog(false);
      },
    });
  };

  const handleReplaceOpenDialog = (item) => {
    setOpenDialog(true);
    (window as any).BynderCompactView.open({
      ...bynderConfig,
      selectedAssets: [item.databaseId],
      mode: Modes.SingleSelect,
      onSuccess: (assets) => {
        if (!assets[0]) {
          return;
        }
        replaceItem(item, assets[0]);
      },
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
      <FieldDetails title={sdk.title} description={sdk.description} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <BynderImageField
          items={items}
          cardImages={cardImages}
          readOnly={sdk.readOnly}
          schema={sdk.field.schema}
          onAdd={handleOpenDialog}
          onUpdate={updateItems}
          onRemove={removeItem}
          onReplace={handleReplaceOpenDialog}
          multiSelect={multiSelectEnabled}
        />
      </div>
    </div>
  );
}

export default BynderExtension;
