const mongoose = require('mongoose');

// schema 
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    year: { type: Number, required: true }, 
    director: { type: String, required: true }, 
    cast: { type: Array, required: true }, 
    plot: { type: String, required: true }, 
    poster: { type: String, required: true }, 
    genres: { type: Array, required: true }, 
    runtime: { type: Number, required: true }
});

// model 
const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;