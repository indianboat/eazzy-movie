"use client";

import { AnimatePresence, useCycle, motion } from 'framer-motion';
import Link from 'next/link'
import React from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const Navbar = () => {

  const [isOpen, toggleOpen] = useCycle(false, true);

  const drawerHandler = () => {
    toggleOpen(!isOpen);
  };

  const drawerVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
  };

  const handleLinkClick = () => {
    if (isOpen) {
      drawerHandler();
    }
  };


  return (
    <>
      <nav className="border py-4 px-4 shadow">
        <div className="flex lg:justify-between md:justify-between sm:justify-between justify-between items-center">
          <div className="lg:hidden md:hidden sm:hidden flex">
            <button onClick={drawerHandler}><HiMenuAlt2 size={22} /></button>
          </div>
          <div className="">
            <Link href="/" className="text-2xl font-semibold">EazzyMovie</Link>
          </div>
          <div className="lg:flex md:flex sm:flex hidden">
            <ul className='flex gap-x-4'>
              <li><Link href="/" className='font-medium hover:text-blue-700 transition-colors'>Home</Link></li>
              <li><Link href="/" className='font-medium hover:text-blue-700 transition-colors'>Blog</Link></li>
              <li><Link href="/aboutus" className='font-medium hover:text-blue-700 transition-colors'>About us</Link></li>
              <li><Link href="/" className='font-medium hover:text-blue-700 transition-colors'>Contact</Link></li>
            </ul>
          </div>

        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={drawerVariants}
                className="fixed bg-white z-50 overflow-auto h-screen lg:w-64 md:w-60 sm:w-52 w-48 inset-0"
              >
                <div className="flex justify-between items-center p-3">
                  <span className="text-md font-semibold">Eazzy Movie</span>
                  <button
                    onClick={() => toggleOpen()}
                    className="rounded-lg p-1 bg-[#EEF2F5] dark:bg-neutral-950 text-[#3F3D56] hover:text-black dark:text-[#EEF2F5]"
                  >
                    <CgClose size={16} />
                  </button>
                </div>
                <div className="">
                  <ul className='flex flex-col w-full p-3 gap-4'>
                    <li><Link href="/" className='font-medium px-2 py-1 rounded-lg flex w-full hover:bg-slate-100 hover:text-blue-700 transition-colors'>Home</Link></li>
                    <li><Link href="/" className='font-medium px-2 py-1 rounded-lg flex w-full hover:bg-slate-100 hover:text-blue-700 transition-colors'>Blog</Link></li>
                    <li><Link href="/aboutus" className='font-medium px-2 py-1 rounded-lg flex w-full hover:bg-slate-100 hover:text-blue-700 transition-colors'>About us</Link></li>
                    <li><Link href="/" className='font-medium px-2 py-1 rounded-lg flex w-full hover:bg-slate-100 hover:text-blue-700 transition-colors'>Contact</Link></li>
                  </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-30 bg-black backdrop-blur opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.1 }}
              exit={{ opacity: 0 }}
              onClick={() => toggleOpen()}
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default Navbar