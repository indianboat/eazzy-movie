"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { useFormik } from 'formik';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import toast from 'react-hot-toast';

const MovieCard = ({ movieData }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratingAverage, setRatingAverage] = useState(0);

  useEffect(() => {
    async function ratingPoint() {
      const res = await fetch(`/api/rating/${movieData.imdbID}`);
      const avg = await res.json();
      if(res.status === 200){
        setRatingAverage(avg.ratingAverage);
      }
      else if(res.status === 404){
        setRatingAverage(0);
      }
    }
    ratingPoint();

  }, [movieData]);


  const formik = useFormik({
    initialValues: {
      movieTitle:"",
      imdb_id: "",
      rating: { name: "", email: "", watch_date: "", mobile: "", rate_point: 0 },
    },
    onSubmit
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // MAX Date
  let dd = new Date().getDate();
  if (dd <= 9) { dd = `0${dd}` }

  let mm = new Date().getMonth() + 1;
  if (mm <= 9) { mm = `0${mm}` }

  let yyyy = new Date().getFullYear();

  async function onSubmit(values) {

    formik.values.movieTitle = movieData.Title;
    formik.values.imdb_id = movieData.imdbID;

    setLoading(true);
    const res = await fetch("/api/rating", {
      method: "POST",
      headers: {
        "Content-Tpye": "application/json"
      },
      body: JSON.stringify(values)
    });
    
    if (res.status == 201) {
      toast.success("Movie Rated successfully !");
      setLoading(false);
    }
    else if (res.status == 422) {
      toast.error("You already rated this movie !");
      setLoading(false);
    }
    else if (res.status == 200) {
      toast.success("Rating Added !");
      setLoading(false);
    }
    else if (res.status == 500) {
      toast.error("Internal Server Error");
      setLoading(false);
    }

    formik.resetForm();
    closeModal();
  }

  return (
    <>
      {
        movieData?.Search?.length <= 0 ? <div className="px-5 py-4">Movie will show here</div> :
          <div className="flex px-5 py-4">
            <div className="flex flex-col justify-between rounded-xl hover:ring-2 hover:ring-slate-500 transition-all shadow-md w-full">
              <button className='p-4 w-full flex  rounded-xl' onClick={() => { openModal() }}>
                <Image src={movieData?.Poster === "N/A" ? "/poster-not-available.png" : movieData?.Poster} className='rounded-lg' width={1280} height={1920} priority alt='img-poster' />

              </button>
              <div className="py-2 px-4 gap-4">
                <p className='text-lg'>{movieData.Title}</p>
                <p className='text-gray-700 italic'>{movieData.Year}</p>
                <p className='flex flex-row gap-x-2'>
                  {
                    ratingAverage == 1 ?
                      <><AiFillStar className='text-yellow-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /></>
                      : ratingAverage == 2 ?
                        <><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /></>
                        : ratingAverage == 3 ?
                          <><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /></>
                          : ratingAverage == 4 ?
                            <><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /></>
                            : ratingAverage == 5 ?
                              <><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /><AiFillStar className='text-yellow-400' size={26} /></> : <><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /><AiOutlineStar className='text-gray-400' size={26} /></>
                  }
                </p>
                <p>Rating : {ratingAverage}</p>
              </div>
            </div>
          </div>
      }

      <Modal isOpen={isModalOpen}>
        <h2 className="text-lg font-semibold mb-4">Rate this movie</h2>
        {/* <p>{movieData.Title}</p> */}
        <form method="POST" onSubmit={formik.handleSubmit} className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  gap-4'>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name">Name</label>
            <input required type="text" placeholder='enter your name' className='px-3 py-2 capitalize rounded-lg outline-none bg-neutral-200' name='rating.name' id='name' {...formik.getFieldProps("rating.name")} autoComplete="off" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Email</label>
            <input required type="email" placeholder='enter your email' className='px-3 lowercase py-2 rounded-lg outline-none bg-neutral-200' name='rating.email' id='email' {...formik.getFieldProps("rating.email")} autoComplete="off" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="mobile">Mobile</label>
            <input required type="tel" maxLength={10} placeholder='enter your mobile' className='px-3 py-2 rounded-lg outline-none bg-neutral-200' name='rating.mobile' id='mobile' {...formik.getFieldProps("rating.mobile")} autoComplete="off" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="watch_date">Watching Date</label>
            <input required type="date" max={`${yyyy}-${mm}-${dd}`} className='px-3 py-2 rounded-lg outline-none bg-neutral-200' name='rating.watch_date' id='watch_date' {...formik.getFieldProps("rating.watch_date")} autoComplete="off" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="rate_point">Rating</label>
            <select required className='px-3 py-2 rounded-lg outline-none bg-neutral-200' name='rating.rate_point' id='rate_point' {...formik.getFieldProps("rating.rate_point")}>
              <option>Select rate point</option>
              <option value="1">&#11088;</option>
              <option value="2">&#11088;&#11088;</option>
              <option value="3">&#11088;&#11088;&#11088;</option>
              <option value="4">&#11088;&#11088;&#11088;&#11088;</option>
              <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088;</option>
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
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>

      </Modal>
    </>
  )
}

export default MovieCard

