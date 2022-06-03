import React from 'react';
import { SpinnerGap } from 'phosphor-react';
import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      id="loader"
      className={`
            fixed top-1/2 left-1/2 z-30 `}
    >
      <SpinnerGap size={80} className="fixed top-1/2 left-1/2 z-30 animate-spin text-orange-400/80" weight="bold" />
    </motion.div>
  );
};

export default PageLoader;
