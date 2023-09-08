"use client";

import MovieCard from './MovieCard';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import Loading from './Loading';

import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const MovieSection = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const totalPages = Math.ceil(movies.totalResults / moviesPerPage);


  const formik = useFormik({
    initialValues: {
      movieTitle: "",
      movieId: "",
      movieYear: "",
      movieType: "",
    },
    onSubmit
  });

  async function onSubmit(values) {
    setLoading(true);
    let url = "";
    const { movieTitle, movieId, movieYear, movieType } = values;

    if (movieTitle === "" && movieId === "") {
      toast.error("Enter movie title or id")
      setLoading(false);
    }

    if (movieTitle !== "" || movieId !== "" || movieYear !== "" || movieType !== "") {

      url = `https://www.omdbapi.com/?apikey=bd1e323a&s=${movieTitle}&y=${movieYear}&type=${movieType}&i=${movieId}&page=${currentPage}`;

      const res = await fetch(url);
      const result = await res.json();

      setLoading(false);

      if (result.Error === "Movie not found!") {
        toast.error("Movie not found !");
        setMovies([]);
      }

      else if (result.Error === "Series not found!") {
        toast.error("Series not found!!");
        setMovies([]);
      }

      else if (result.Error === "Too many results.") {
        toast.error("Too many results. need more specific title");
        setMovies([]);
      }

      else if (result.Response === "False" && result.Error === "Incorrect IMDb ID.") {
        toast.error("Incorrect IMDb ID.");
        setMovies([]);
      }
      else {
        toast.success("Movie found !");
        let obj = {
          Response: true,
          Search: [],
          totalResults: 1
        };
        if (result) {
          obj.Search.push(result)
          setMovies(obj)
        }
        if (result?.Search?.length > 0) {
          setMovies(result);
        }
      }
    }
  }

  useEffect(() => {
    if (formik.values.movieTitle !== "") {
      onSubmit(formik.values);
    }
    window.scroll(0, 0);
  }, [currentPage]);


  return (
    <>
      <Toaster />
      {loading ? <Loading /> : null}
      <div className="container my-8 mx-auto">
        <div className="p-4 flex">
          <form onSubmit={formik.handleSubmit} className='flex lg:flex-row md:flex-row sm:flex-col flex-col gap-4 w-full'>

            <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">

              <div className="flex flex-col gap-x-2 items-start justify-center">
                <label htmlFor="movieTitle" className='text-gray-700'>Search movie with title</label>
                <input spellCheck={false} type="text" className='w-full bg-gray-200 flex px-4 py-2 rounded-md outline-none' placeholder='search with title' name="movieTitle" id="movieTitle" {...formik.getFieldProps("movieTitle")} />
              </div>

              <div className="flex flex-col gap-x-2 items-start justify-center">
                <label htmlFor="movieId" className='text-gray-700'>Search movie with id..</label>
                <input spellCheck={false} type="text" className='w-full bg-gray-200 flex px-4 py-2 rounded-md outline-none' placeholder='search with id...' name="movieId" id="movieId" {...formik.getFieldProps("movieId")} />
              </div>

              <div className="flex flex-col gap-x-2">
                <label htmlFor="movieYear" className='text-gray-700'>Search movie with year</label>
                <input type="tel" maxLength={4} placeholder='search movie with year' className='w-full bg-gray-200 flex px-4 py-2 rounded-md outline-none' name="movieYear" id="movieYear" {...formik.getFieldProps("movieYear")} />
              </div>

              <div className="flex flex-col gap-x-2">
                <label htmlFor="movieType" className='text-gray-700'>Search movie with year</label>
                <select className='w-full bg-gray-200 flex px-4 py-2 rounded-md outline-none' {...formik.getFieldProps("movieType")} name="movieType" id="movieType">
                  <option value="">Select type</option>
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                  <option value="episode">Episode</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <button type="submit" className='px-4 py-2 rounded-md outline-none bg-neutral-800 text-white'>search</button>
            </div>

          </form>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {
            movies.length <= 0 ? <div className='p-4'>Movies will display here...</div> : movies?.Search?.map((movieData, index) => {
              return <MovieCard movieData={movieData} key={index} />
            })
          }
        </div>

        {/* Pagination */}
        {
          totalPages > 1 ? <div className="w-fit flex flex-col px-4 py-2 gap-y-2">
            <h1>Page</h1>
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div> : null
        }
      </div>
    </>
  )
}

export default MovieSection