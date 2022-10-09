import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Item = ({ value, listeners, isDragging }) => {
  return (
    <div
    // exit={{ opacity: 0 }}
    >
      <h1>{value}</h1>
      <button {...listeners}>_</button>
    </div>
  );
};
export default Item;
