import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

export default function SortableListItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <Box sx={{ mt: 1, ml: 1, mr: 1 }} style={style} id={props.id} ref={setNodeRef} {...attributes} {...listeners}>
      {props.children}
    </Box>
  );
}
