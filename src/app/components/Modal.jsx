import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const Modal = ({ isOpen, children }) => {

  useEffect(()=>{
    if(isOpen){
      document.body.style.setProperty("overflow", "hidden");
    }
    else{
      document.body.style.removeProperty("overflow");
    }
  },[isOpen])


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex justify-center h-full bg-black bg-opacity-50 p-4 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white lg:w-2/4 md:w-2/3 sm:w-full w-full h-fit p-6 rounded-xl shadow-md overflow-auto"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
