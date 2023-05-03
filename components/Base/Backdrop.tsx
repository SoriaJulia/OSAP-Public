import * as React from 'react';
import { motion } from 'framer-motion';

type BackdropProps = {
  onClickHandler?: () => void;
  show: boolean;
};

const Backdrop: React.FC<BackdropProps> = ({ onClickHandler, show }) => {
  return (
    <motion.div
      id="backdrop"
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={`fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-700/70 ${
        show ? 'fixed' : 'hidden'
      }`}
      onClick={onClickHandler}
    />
  );
};

export default Backdrop;
