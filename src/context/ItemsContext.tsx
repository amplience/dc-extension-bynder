import { createContext, useContext, useReducer } from "react";
import { useContentFieldExtension } from "../components/WithFieldExtension";
import { isObjectEmpty } from "../utils/is-object-empty";
import { isObject } from "../utils/is-object";

const ItemsContext = createContext(null);
const ItemsDispatchContext = createContext(null);

const normaliseInitialValue = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (isObject(value) && isObjectEmpty(value)) {
    return [];
  }
  return [value];
};

export function ItemsProvider({ children }) {
  const sdk = useContentFieldExtension();
  const [items, dispatch] = useReducer(itemsReducer, normaliseInitialValue(sdk.initialValue));

  return (
    <ItemsContext.Provider value={items}>
      <ItemsDispatchContext.Provider value={dispatch}>{children}</ItemsDispatchContext.Provider>
    </ItemsContext.Provider>
  );
}

export function useItems() {
  return useContext(ItemsContext);
}

export function useItemsDispatch() {
  return useContext(ItemsDispatchContext);
}

function itemsReducer(items, action) {
  switch (action.type) {
    case "add":
    case "reorder":
    case "replace": {
      return action.items;
    }
    case "remove": {
      return items.filter((item) => item.databaseId !== action.item?.databaseId);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
