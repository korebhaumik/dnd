import { React, useState } from "react";
import Delete from "./components/delete";
import Droppable from "./components/droppable";
import Present from "./components/present";
import { AnimatePresence, motion } from "framer-motion";
import { removeAtArray, insertAtArray, arrayMove } from "./components/logic";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import "./style.css";

const App = () => {
  const [food, setFood] = useState({
    fruits: [
      { name: "apple", id: 1 },
      { name: "pear", id: 2 },
      { name: "banana", id: 3 },
    ],
    vegies: [
      { name: "cabbage", id: 4 },
      { name: "onion", id: 5 },
      { name: "carrot", id: 6 },
    ],
  });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const [activeID, setActiveID] = useState(null);

  const sensors = useSensors(mouseSensor, touchSensor);

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    // console.log(insertAtArray(items[overContainer], overIndex, item));
    // console.log(item);
    return {
      ...items,
      [activeContainer]: removeAtArray(items[activeContainer], activeIndex),
      [overContainer]: insertAtArray(items[overContainer], overIndex, item),
    };
  };

  const handleDragEnd = ({ active, over }) => {
    // console.log(active, over);
    if (!over) {
      setActiveID(null);
      return;
    }
    if (over.id == "delete") {
      setActiveID(null);
      console.log(active, over);
      const activeContainer = active.data.current.sortable.containerId;
      const activeIndex = active.data.current.sortable.index;
      setFood((prev) => {
        return {
          ...prev,
          [activeContainer]: removeAtArray(prev[activeContainer], activeIndex),
        };
      });
      return;
    }
    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in food
          ? food[overContainer].length + 1
          : over.data.current.sortable.index;

      setFood((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          const payload = itemGroups[activeContainer][activeIndex];
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            payload
          );
        }

        return newItems;
      });
    }
    // console.log(food);

    setActiveID(null);
  };

  const handleDragStart = (event) => {
    // console.log(event);
    // console.log(event.active.data.current.sortable.containerId);
    setActiveID(event.active.id);
  };

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;
    // console.log(over);

    if (overId !== "delete") {
      if (!overId) {
        return;
      }

      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;

      if (activeContainer !== overContainer) {
        setFood((food) => {
          const activeIndex = active.data.current.sortable.index;
          // const activeIndex = active.data.current.sortable.index;
          const overIndex =
            over.id in food
              ? food[overContainer].length + 1
              : over.data.current.sortable.index;
          // const overIndex = 1;
          // ? Food[overContainer].length + 1
          const payload = food[activeContainer][activeIndex];
          return moveBetweenContainers(
            food,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            payload
          );
        });
      }
    }
  };

  const handleDragCancel = (event) => {
    // console.log(event.active.id);
    setActiveID(null);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
      >
        <div className="app-div">
          <div className="wrapper">
            {Object.keys(food).map((group) => (
              <Droppable
                key={group}
                id={group}
                items={food[group]}
                activeID={activeID}
              />
            ))}
          </div>
        </div>
        <DragOverlay
          modifiers={[restrictToWindowEdges]}
          // className="overlay"
          //   transition="transform 0ms ease"
          // style={{ transitionDuration: `${200}ms` }}
        >
          {activeID ? <Present value="foood" dragOverlay /> : null}
        </DragOverlay>
        <AnimatePresence mode="wait">{activeID && <Delete />}</AnimatePresence>
      </DndContext>
    </>
  );
};
export default App;
