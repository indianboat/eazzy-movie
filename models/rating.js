import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  movieTitle:String,
  imdb_id:String,
  rating:[{
    name:String,
    mobile:String,
    email:String,
    watch_date:Date,
    rate_point:Number
  }]
}, { timestamps: true });


ratingSchema.methods.addRating = async function(ratingdata){
  try {
    this.rating = this.rating.concat(ratingdata)
    await this.save();
    return this.rating;
    
  } catch (error) {
    throw new Error(error)
  }
}

mongoose.models = {};
const Rating = mongoose.model("ratings", ratingSchema);

export default Rating;