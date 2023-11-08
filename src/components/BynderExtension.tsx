import React, { useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";
import jsonpath from "jsonpath";

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

  const defaultMapping: Record<string, { jsonPath: string }> = {
    name: { jsonPath: "$.name" },
    files: { jsonPath: "$.files" },
    databaseId: { jsonPath: "$.databaseId" },
  };

  const mappings: Record<string, { jsonPath: string }> = installedMappings
    ? {
        ...installedMappings,
        ...defaultMapping,
      }
    : null;

  const valueMapper = (value, mappings: Record<string, { jsonPath: string }>) => {
    let mappedValues = {};
    for (const [key, mapping] of Object.entries(mappings)) {
      if (value) {
        mappedValues[key] = jsonpath.query(value, mapping.jsonPath)[0];
      }
    }
    return mappedValues;
  };

  const handleChange = (newValue) => {
    let mappedValues = mappings ? valueMapper(newValue, mappings) : newValue;
    setValue(mappedValues);
    sdk.field.setValue(mappedValues);
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
