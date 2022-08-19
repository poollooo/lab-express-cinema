const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: Schema.Types.String,
    },
    director: {
        type: Schema.Types.String,
    },
    stars: Schema.Types.Array,
    image: Schema.Types.String,
    description: Schema.Types.String,
    showtimes: Schema.Types.Array,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
