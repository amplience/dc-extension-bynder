import { createContext, useContext, useReducer } from "react";
import { useContentFieldExtension } from "../components/WithFieldExtension";

const ItemsContext = createContext(null);
const ItemsDispatchContext = createContext(null);

export function ItemsProvider({ children }) {
  const sdk = useContentFieldExtension();
  const [items, dispatch] = useReducer(
    itemsReducer,
    Array.isArray(sdk.initialValue) ? sdk.initialValue : [sdk.initialValue],
  );

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
    case "add": {
      return [...items, ...action.items];
    }
    case "remove": {
      return items.filter((item) => item.databaseId !== action.item?.databaseId);
    }
  }
}
