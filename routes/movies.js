const express = require('express');
const Movie = require('../schemas/movie');

const router = express.Router();

const movies = [];

const isValidated = function(body) {
    if ([body?.title, body?.year, body?.director, body?.cast, body?.plot, body?.poster, body?.genres, body?.runtime].includes(undefined)) {
        var empty = [];

        if (body?.title === undefined) 
            empty.push('title');
        if (body?.year === undefined) 
            empty.push('year');
        if (body?.director === undefined) 
            empty.push('director');
        if (body?.cast === undefined) 
            empty.push('cast');
        if (body?.plot === undefined) 
            empty.push('plot');
        if (body?.poster === undefined) 
            empty.push('poster');
        if (body?.genres === undefined) 
            empty.push('genres');
        if (body?.runtime === undefined) 
            empty.push('runtime');

        return empty;
    } else {
        return true;
    }
}

router.get('/', async (req, res) => {
    const movies = await Movie.find({});
    res.setHeader("Content-Type", "application/json");
    res.json(movies);
});

router.post('/', (req, res) => {
    const body = req.body;
    
    if (isValidated(body) === true) {
        const newMovie = new Movie ({
            title: body.title,
            year: body.year,
            director: body.director,
            cast: body.cast,
            plot: body.plot,
            poster: body.poster,
            genres: body.genres,
            runtime: body.runtime
        });

        newMovie.save();
        res.send(newMovie);
    } else {
        res.send(isValidated(body).join(', ') + ' cannot be empty');
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const body = req.body;

    if (!id) {
        res.send({ error: true, message: "id is not defined" });
        return;
    }

    const updatedMovie = await Movie.findOneAndUpdate(
        {  _id: id  },
        {  ...body  },
        { new: true }
    );

    res.send(updatedMovie);
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.send({ error: true, message: "id is not defined" })
        return;
    }

    const result = await Movie.findByIdAndDelete(id);
    res.send(result);
});

module.exports = router;