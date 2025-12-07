import React from 'react';
import { motion } from "framer-motion";
const ball = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5", // indigo
    margin: "auto",
    display: "block",
};
const Loading = () => {
    return (
      <div className='min-h-screen flex justify-center items-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={ball}
        />
      </div>
    );
};

export default Loading;