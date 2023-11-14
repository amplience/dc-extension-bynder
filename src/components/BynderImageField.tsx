import React from "react";
import { Box, Fab, Stack, Tooltip } from "@mui/material";
import Chooser from "./Chooser";
import AddIcon from "@mui/icons-material/Add";
import { useContentFieldExtension } from "./WithFieldExtension";
import AddAction from "./AddAction";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToWindowEdges } from "@dnd-kit/modifiers";
import SortableListItem from "./SortableListItem";
import { MediaItem } from "./MediaItem";

export type ImageFieldProps = {
  items: any;
  schema?: any;
  readOnly?: boolean;
  style?: any;
  onAdd?: (options) => void;
  onUpdate?: (items) => void;
  onRemove?: (id) => void;
  onReplace?: (id) => void;
  multiSelect: boolean;
};

function BynderImageField(props: ImageFieldProps) {
  const { items, schema, readOnly, onAdd, multiSelect, onUpdate, onRemove, onReplace, ...other } = props;

  const sdk = useContentFieldExtension();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  //@ts-ignore
  const { bynderConfig: installedBynderConfig } = {
    ...sdk.params.installation,
    ...sdk.params.instance,
  };

  const handleAdd = async () => {
    try {
      onAdd({});
    } catch (err) {}
  };

  const handleReplace = async (item) => {
    try {
      onReplace(item);
    } catch (err) {}
  };

  const dragEnd = (event) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.databaseId === active?.id);
      const newIndex = items.findIndex((item) => item.databaseId === over?.id);
      onUpdate(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <Stack direction={"row"}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          p: 1,
        }}
      >
        {multiSelect && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={dragEnd}
            modifiers={[restrictToWindowEdges, restrictToParentElement]}
          >
            <SortableContext items={items.map((item) => item.databaseId)} strategy={rectSortingStrategy}>
              {items.map((item) => (
                <SortableListItem id={item.databaseId} key={item.databaseId}>
                  <MediaItem
                    item={item}
                    config={installedBynderConfig}
                    handleRemove={() => onRemove(item.databaseId)}
                    handleReplace={() => handleReplace(item)}
                    {...other}
                  />
                </SortableListItem>
              ))}
            </SortableContext>
          </DndContext>
        )}
        {!multiSelect && items.length > 0 && (
          <MediaItem
            item={items[0]}
            config={installedBynderConfig}
            handleRemove={() => onRemove(items[0].databaseId)}
            handleReplace={() => handleReplace(items[0])}
            {...other}
          />
        )}
        {(multiSelect || !items.length) && (
          <Box sx={{ mt: 1, ml: 1, mr: 1 }} style={{ position: "relative" }}>
            <Chooser {...other}>
              <AddAction>
                <Tooltip title="Add Image" arrow>
                                    <Fab disabled={schema?.maxItems && multiSelect && items.length >= schema.maxItems} 
                    onClick={handleAdd} 
                    style={{ backgroundColor: "#ccc" }}
                  >
                    <AddIcon fontSize="large" style={{ color: "#fff" }} />
                  </Fab>
                </Tooltip>
              </AddAction>
            </Chooser>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

export default BynderImageField;
