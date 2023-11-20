import React, { useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";
import { serialize } from "../utils/serialize";
import { ContentMapping, contentMapper } from "../utils/content-mapper";
import { FieldDetails } from "./FieldDetails";
import AlertDialog from "./AlertDialog";

enum Mode {
  SingleSelect = "SingleSelect",
  SingleSelectFile = "SingleSelectFile",
  MultiSelect = "MultiSelect",
}

function BynderExtension() {
  const sdk = useContentFieldExtension();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDuplicateDialog, setOpenDuplicateDialog] = useState(false);
  const [duplicate, setDuplicate] = useState(null);
  const [items, setItems] = useState(sdk.initialValue);

  const handleOpenDuplicateDialog = (item, index) => {
    setDuplicate({ name: item.name, index });
    setOpenDuplicateDialog(true);
  };

  const handleCloseDuplicateDialog = () => {
    setOpenDuplicateDialog(false);
    setDuplicate(null);
  };

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
    additionalInfo: { jsonPath: "$.additionalInfo" },
  };

  const contentMapping: ContentMapping = amplienceConfig?.contentMapping
    ? {
        ...amplienceConfig?.contentMapping,
        ...defaultMapping,
      }
    : null;

  const bynderConfig = {
    ...(installedBynderConfig ? installedBynderConfig : {}),
    onSuccess: undefined,
    onLogout: undefined,
    authentication: installedBynderConfig?.authentication?.token
      ? { getAccessToken: () => installedBynderConfig?.authentication?.token }
      : undefined,
  };

  const multiSelectEnabled = bynderConfig.mode === Mode.MultiSelect;

  const cardImages: string[] = amplienceConfig?.cardImages;

  const updateItems = (items) => {
    setItems(items);
    setField(items);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.databaseId !== id);
    updateItems(updatedItems);
  };

  const replaceItem = (oldItem, newItem) => {
    const existingItemIndex = items.findIndex((item) => item.databaseId === newItem.databaseId);
    if (oldItem.databaseId !== newItem.databaseId && existingItemIndex !== -1) {
      handleOpenDuplicateDialog(newItem, existingItemIndex);
      return;
    }
    const modifiedItems = items.map((item) => (item.databaseId === oldItem.databaseId ? newItem : item));
    updateItems(modifiedItems);
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

  const mergeAdditionalInfo = (assets, additionalInfo) => {
    return assets.map((asset) => ({
      ...asset,
      ...(additionalInfo?.selectedFile ? { additionalInfo: { selectedFile: additionalInfo.selectedFile } } : {}),
    }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    const selectedAssets = items.map((item) => item.databaseId);
    (window as any).BynderCompactView.open({
      ...bynderConfig,
      selectedAssets,
      onSuccess: (assets, additionalInfo) => {
        updateItems(mergeAdditionalInfo(assets, additionalInfo));
        setOpenDialog(false);
      },
    });
  };

  const handleReplaceOpenDialog = (oldItem) => {
    setOpenDialog(true);
    (window as any).BynderCompactView.open({
      ...bynderConfig,
      selectedAssets: [oldItem.databaseId],
      mode:
        !multiSelectEnabled && bynderConfig.mode === Mode.SingleSelectFile ? Mode.SingleSelectFile : Mode.SingleSelect,
      onSuccess: (assets, additionalInfo) => {
        if (!Array.isArray(assets) || assets.length === 0) {
          return;
        }
        replaceItem(oldItem, mergeAdditionalInfo(assets, additionalInfo)[0]);
        setOpenDialog(false);
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
      <AlertDialog
        open={openDuplicateDialog}
        handleClose={handleCloseDuplicateDialog}
        title={"Item is already in your list"}
        text={`"${duplicate?.name}" has already been selected in position ${duplicate?.index + 1}`}
      />
    </div>
  );
}

export default BynderExtension;
