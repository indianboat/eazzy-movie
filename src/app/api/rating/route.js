import { NextResponse } from "next/server";
import Rating from "../../../../models/rating";
import connectDB from "../../../../middleware/db";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    await connectDB();
    const ratings = await Rating.find({});
    return new NextResponse(JSON.stringify(ratings), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "500 Internal Server Error: " + error }, { status: 500 });
  }
}

export async function POST(request) {

  const { imdb_id, movieTitle, rating } = await request.json();

  try {
    await connectDB();

    const movieExist = await Rating.findOne({ imdb_id });
    console.log(movieExist);

    if (movieExist == null) {
      const createMovie = new Rating({ imdb_id, movieTitle, rating });
      const result = await createMovie.save();

      if (result) {
        return new NextResponse('Movie Rated', { status: 201, statusText:"Movie Rated" });
      } else {
        return new NextResponse('Internal Server Error', { status: 500, statusText:"Internal Server Error" });
      }
    }
    else {
      let checkRatingExist = false;
      const { email } = rating;

      for (let i = 0; i < movieExist.rating.length; i++) {
        const element = movieExist.rating[i];
        if (element.email === email) {
          checkRatingExist = true;
        }
      }

      if (checkRatingExist) {
        return new NextResponse('You Already Rated this movie', {status:422, statusText:"You Already Rated this movie"});
      }
      else{
        await movieExist.addRating(rating);
        const ratingAdded = await movieExist.save();

        if(ratingAdded){
          return new NextResponse('Rating Added', {status:200, statusText:"Rating Added"});
        }
        else{
          return new NextResponse('Technical Error', {status:500, statusText:"Internal Server Error"});
        }
      }
    }

  } catch (error) {
    return NextResponse.json({ error: "500 Internal Server Error: " + error }, { status: 500 });
  }
}