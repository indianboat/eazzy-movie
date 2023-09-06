"use client";

import Image from 'next/image'
import React, { useState } from 'react';
import Modal from './Modal';
import { useFormik } from 'formik';


const MovieCard = ({ movieData }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  const openModal = (imdb_id) => {
    setIsModalOpen(true);
    setId(imdb_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      date: Date,
      rating: ""
    },
    onSubmit
  });

  // MAX Date
  let dd = new Date().getDate();
  if (dd <= 9) { dd = `0${dd}` }

  let mm = new Date().getMonth() + 1;
  if (mm <= 9) { mm = `0${mm}` }

  let yyyy = new Date().getFullYear();

  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      {
        movieData?.Search?.length <= 0 ? <div className="px-5 py-4">Movie will show here</div> :

          <div className="flex px-5 py-4">
            <div className="rounded-xl shadow-md w-full">
              <button className='p-4 w-full' onClick={() => { openModal(movieData.imdbID) }}>
                {
                  movieData.Poster === "N/A" ? "Poster not Available" : <Image src={movieData ? movieData.Poster : ""} className='rounded-lg' width={400} height={400} priority alt='img-poster' />
                }
              </button>
              <div className="py-2 px-4 gap-4">
                <p className='text-lg'>{movieData.Title}</p>
                <p className='text-gray-700 italic'>{movieData.Year}</p>
              </div>
            </div>
          </div>


      }

      <Modal isOpen={isModalOpen}>
        <h2 className="text-lg font-semibold mb-4">Rate this movie</h2>
        <form method="POST" onSubmit={formik.handleSubmit} className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  gap-4'>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name">Name</label>
            <input required type="text" placeholder='enter your name' className='px-3 py-2 capitalize rounded-lg outline-none bg-neutral-200' name='name' id='name' {...formik.getFieldProps("name")} />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Email</label>
            <input required type="email" placeholder='enter your email' className='px-3 lowercase py-2 rounded-lg outline-none bg-neutral-200' name='email' id='email' {...formik.getFieldProps("email")} />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="mobile">Mobile</label>
            <input required type="tel" maxLength={10} placeholder='enter your mobile' className='px-3 py-2 rounded-lg outline-none bg-neutral-200' name='mobile' id='mobile' {...formik.getFieldProps("mobile")} />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="date">Watching Date</label>
            <input required type="date" max={`${yyyy}-${mm}-${dd}`} className='px-3 py-2 rounded-lg outline-none bg-neutral-200' name='date' id='date' {...formik.getFieldProps("date")} />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="rating">Rating</label>
            <select required className='px-3 py-2 rounded-lg outline-none bg-neutral-200' name='rating' id='rating' {...formik.getFieldProps("rating")}>
              <option value="">Select rate point</option>
              <option value="1">&#10029;</option>
              <option value="2">&#10029;&#10029;</option>
              <option value="3">&#10029;&#10029;&#10029;</option>
              <option value="4">&#10029;&#10029;&#10029;&#10029;</option>
              <option value="5">&#10029;&#10029;&#10029;&#10029;&#10029;</option>
            </select>
          </div>
          <div className="flex items-center gap-x-4 justify-end">
            <button
              type="button"
              className="mt-4 px-4 py-2 border-2 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-500 text-gray-700 dark:text-gray-300 rounded-full"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-rose-700 text-white rounded-full"
            >
              Save
            </button>
          </div>
        </form>

      </Modal>
    </>
  )
}

export default MovieCard

