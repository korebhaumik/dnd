import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Draggable({ id, dragOverlay }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };
  // const style = {
  //   cursor: dragOverlay ? "grabbing" : "grab",
  // };
  return (
    <>
      <h1 ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {id}
      </h1>
    </>
  );
}
