import React, { useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";

function BynderExtension() {
  const sdk = useContentFieldExtension();
  const [value, setValue] = useState(sdk.initialValue);
  const [openDialog, setOpenDialog] = useState(false);

  //@ts-ignore
  const { bynderConfig: installedBynderConfig, contentMapping } = {
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

  const handleChange = (newValue) => {
    setValue(newValue);
    sdk.field.setValue(newValue);
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
