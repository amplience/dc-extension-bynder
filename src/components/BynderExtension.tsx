import React, { useState } from "react";
import { useContentFieldExtension } from "./WithFieldExtension";
import BynderImageField from "./BynderImageField";

function BynderExtension() {
  const sdk = useContentFieldExtension();
  const [value, setValue] = useState(sdk.initialValue);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    sdk.field.setValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);

    (window as any).BynderCompactView.open({
      language: "en_US",
      theme: {
        colorButtonPrimary: "#3380FF",
      },
      mode: "SingleSelectFile",
      onSuccess: function (assets, additionalInfo) {
        handleChange(assets[0]);
        setOpenDialog(false);
      },
      portal: {
        url: "https://wave-trial.getbynder.com/",
      },
      assetTypes: ["image"],
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
