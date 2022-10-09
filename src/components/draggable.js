import React from "react";
import { useSortable } from "@dnd-kit/sortable";
// import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Item from "./item";

export default function Draggable({ id, value }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };
  return (
    <div className="one" style={style} ref={setNodeRef} {...attributes}>
      <Item
        listeners={{ ...listeners }}
        isDragging={isDragging}
        value={value}
      />
    </div>
  );
}
