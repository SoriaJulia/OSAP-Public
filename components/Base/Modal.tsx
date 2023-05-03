import * as React from 'react';
import { X, ArrowLeft } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';
import Backdrop from './Backdrop';

const variants = {
  light: 'bg-slate-50',
  dark: 'bg-slate-700',
};

const titleVariant = {
  light: 'text-orange-700',
  dark: 'text-yellow-200',
};

type Variants = keyof typeof variants;

export type ModalProps = {
  show: boolean;
  onDismiss: () => void;
  showX?: boolean;
  title?: string;
  variant?: Variants;
};

const Modal: React.FC<ModalProps> = ({ show, onDismiss, showX = true, title, children, variant = 'light' }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          <Backdrop onClickHandler={onDismiss} show={show} />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: '50%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%' }}
            exit={{ y: 1000 }}
            transition={{ ease: 'anticipate', duration: 1 }}
            id="modal"
            className={`${variants[variant]}
            fixed left-1/2 top-1/2 z-30 flex h-screen w-screen transform flex-col items-center justify-start rounded  pt-9 md:h-fit  md:max-h-screen md:w-fit md:justify-between md:pt-0
            `}
          >
            {showX && (
              <>
                <button className="absolute left-2 top-10 md:hidden" onClick={onDismiss}>
                  <ArrowLeft weight="bold" className="text-grey-300" size={36} />
                </button>
                <button className="absolute right-2 top-2 hidden md:flex" onClick={onDismiss}>
                  <X weight="bold" className=" text-grey-200" />
                </button>
              </>
            )}

            <h1
              className={` ${titleVariant[variant]}
            ml-12 mr-4 mt-2 flex text-center font-display text-2xl  md:mx-2 md:-mb-4 md:mt-4 md:text-4xl
            `}
            >
              {title}
            </h1>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
