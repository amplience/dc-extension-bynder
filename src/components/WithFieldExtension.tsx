import { init, ContentFieldExtension } from "dc-extensions-sdk";
import { createContext, useContext, useEffect, useState } from "react";
import { normaliseInitialValue } from "../utils/initial-value";

export type ContentFieldExtensionContextState = ContentFieldExtension & {
  initialValue: any;
  formValue: any;
  readOnly: boolean;
  fieldPointer: string | undefined;
  title: string;
  description: string;
};

export const ContentFieldExtensionContext = createContext<ContentFieldExtensionContextState>(undefined);

export function useContentFieldExtension(): ContentFieldExtensionContextState {
  return useContext(ContentFieldExtensionContext);
}

function WithContentFieldExtension({ children, pollForm = true }) {
  const [sdk, setSDK] = useState(undefined);
  const [initialValue, setInitialValue] = useState(undefined);
  const [formValue, setFormValue] = useState({});
  const [readOnly, setReadOnly] = useState(false);
  const [fieldPointer, setFieldPointer] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  const detectFieldPointer = async (sdk: ContentFieldExtension) => {
    for (let potentialInvalidValue of [1, "", true, {}, []]) {
      try {
        const validationResult = await sdk.field.validate(potentialInvalidValue);
        if (validationResult?.[0]?.pointer) {
          return validationResult?.[0]?.pointer;
        }
      } catch (err: any) {}
    }
  };

  useEffect(() => {
    init().then((sdk: ContentFieldExtension) => {
      setReadOnly(sdk.form.readOnly);
      sdk.field.getValue().then((value) => {
        setInitialValue(normaliseInitialValue(value));
        setSDK(sdk);
        setTitle(sdk.field.schema?.title);
        setDescription(sdk.field.schema?.description);
        detectFieldPointer(sdk)
          .then(setFieldPointer)
          .catch(() => {});
      });
      sdk.frame.startAutoResizer();
      sdk.form.onReadOnlyChange((newValue) => {
        setReadOnly(newValue);
      });
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (!pollForm || !sdk) {
      return () => {};
    }

    const interval = setInterval(async () => {
      try {
        setFormValue(await sdk.form.getValue());
      } catch (err) {
        setFormValue({});
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [sdk, pollForm]);

  return (
    sdk && (
      <ContentFieldExtensionContext.Provider
        value={{ ...sdk, initialValue, readOnly, formValue, fieldPointer, title, description }}
      >
        {children}
      </ContentFieldExtensionContext.Provider>
    )
  );
}

export default WithContentFieldExtension;
