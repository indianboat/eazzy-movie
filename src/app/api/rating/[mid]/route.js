import { NextResponse } from "next/server";
import Rating from "../../../../../models/rating";
import connectDB from "../../../../../middleware/db";


export async function GET(request, {params}) {

  const { mid } = params; 

  try {
    await connectDB();
    const findMovies = await Rating.findOne({imdb_id:mid});

    let sumRatings = 0;
    let avg = 0;

    sumRatings = findMovies?.rating?.reduce((acc, rating) => acc + rating.rate_point, 0);
    avg = sumRatings / findMovies?.rating?.length;
    avg = Math.floor(avg);

    if(findMovies){
      return new NextResponse(JSON.stringify({imdb_id:findMovies?.imdb_id, ratingAverage: avg}), {status:200, statusText:"rated"});
    }
    else{
      return new NextResponse(JSON.stringify("Movie not found !!"), {status:200, statusText:"Movie not found !"});
    }
    
  } catch (error) {
    return NextResponse.json({error:"500 Internal Server Error: " +error}, {status:500, statusText:"500 Internal Server Error"});
  }
}