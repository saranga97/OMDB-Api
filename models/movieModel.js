const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        Title: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        Year: {
            type: Number,
            required: true,
            default: 2023
        },
        Director: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        rating: {
            type: Number,
            required: false,
        }

    },
    {
        //for view request and responding time
        timestamps: true 
    }
)

//Creating mongoose model
const Movie = mongoose.model('Movie', movieSchema);

//export model
module.exports = Movie;