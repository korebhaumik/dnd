import { React, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Draggable from "./components/draggable";
import "./style.css";

const App = () => {
  const [activeId, setActiveId] = useState(null);
  const [fruits, setFruits] = useState(["apple", "pear", "banana"]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event) {
    const { active } = event;

    setActiveId(active.id);
    console.log(event);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFruits((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fruits} strategy={verticalListSortingStrategy}>
          <div className="app-div">
            {fruits.map((item) => (
              <Draggable key={item} id={item} />
            ))}
            {/* <Draggable /> */}
          </div>
          {/* <Droppable /> */}
        </SortableContext>
        <DragOverlay>
          {activeId ? <Draggable id={activeId} key={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};
export default App;
