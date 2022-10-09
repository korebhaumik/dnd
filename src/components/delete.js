import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";

export default function Delete() {
  const { setNodeRef, isOver } = useDroppable({ id: "delete" });
  const style = isOver ? { backgroundColor: "tomato", scale: 1.1 } : null;

  return (
    <motion.div
      key="delete"
      className="delete"
      exit={{ y: 100, opacity: 0 }}
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        border: !isOver ? `${3}px solid` : `${3.5}px solid`,
        borderColor: !isOver ? "rgb(118, 152, 68)" : "rgb(206, 72, 28)",
        scale: !isOver ? 1 : 1.1,
        boxShadow: !isOver
          ? `${0}px ${5}px ${20}px rgba(206, 40, 28,0)`
          : `${0}px ${5}px ${20}px rgba(206, 40, 28,0.4)`,
        opacity: 1,
      }}
      // whileHover={{ borderColor: "rgb(206, 72, 28)" }}
      // style={style}

      ref={setNodeRef}
    >
      Drop here to Delete!
    </motion.div>
  );
}
