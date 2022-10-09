import React from "react";
import { motion } from "framer-motion";

const Present = ({ value, dragOverlay }) => {
  const style = { cursor: dragOverlay ? "grabbing" : "grab" };
  return (
    <motion.div
      className="one"
      initial={{ scale: 1, borderRadius: 5 }}
      animate={{
        scale: 1.05,
        boxShadow: `${0}px ${10}px ${15}px rgba(0, 0, 0, 0.4)`,
      }}
      transition={{ type: "spring", damping: 5 }}
    >
      <h1>{value}</h1>
      <button style={style}>_</button>
    </motion.div>
  );
};
export default Present;
