import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: [true, "review cannot be empty"],
        min: [10, " review should have at least 10 characters"]
    },
    rating: {
        type: Number,
        min: [0, "Rating cannot be below 0"],
        max: [5, "max rating is 5"]
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, "Review must belong to a tour."]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Review must written by a user."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

reviewSchema.pre(/^find/, async function() {
    // this.populate({
    //     path: 'tour',
    //     select: 'name'
    // }).populate({
    //     path: 'user',
    //     select: 'name'
    // })
    this.populate({
        path: 'user',
        select: 'name'
    })
})

const Review = mongoose.model('Review', reviewSchema);

export default Review;