import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Draggable from "./draggable";
export default function Droppable({ items, id, activeID }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  // console.log(items, id, activeID);
  const style = {
    backgroundColor: isOver ? "rgb(255, 96, 88)" : undefined,
  };
  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div className="drop" ref={setNodeRef}>
        {items.map((item) => (
          <Draggable key={item.id} id={item.id} value={item.name} />
        ))}
      </div>
    </SortableContext>
  );
}
