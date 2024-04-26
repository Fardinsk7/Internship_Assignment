const express = require('express');
const router = express.Router();
const Movies = require("../mongooseModels/moviesSchema");
const { body, validationResult } = require('express-validator');

//POST /movie/create to create or add movie in database
router.post('/create', [
    //Using express Validator
    body('name', 'Please Enter name of movie').notEmpty().withMessage("Please Enter Name of Movie"),
    body('img', 'Please Enter image URL').notEmpty().withMessage("Please Enter Image of Movie").isURL().withMessage("Enter a URL only"),
    body('summary', 'Please Enter summary').isLength({ min: 5 }).withMessage("Summary must be for minimum 3 words").notEmpty().withMessage("Please Enter Summary of Movie")
], async (req, res) => {
    try {
        const { name, img, summary } = req.body;

        //Using the express validator to validate the provided body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() })
        }

        //Checking if movie exist or not
        const movieExist = await Movies.findOne({ name });

        if (movieExist) {
            return res.status(400).json({ msg: "Movie Already Exist" })
        } else {

            //Creating new movie
            const newMovie = new Movies({
                name,
                img,
                summary
            })
            newMovie.save()
                .then((savedMovie) => {
                    console.log(savedMovie._id)
                    res.status(200).send({ msg: "Movie Added Successfully" });
                }).catch(err => res.status(500).json({ msg: err }))

        }


    } catch (error) {
        //Handling error By consoling it on terminal 
        console.error("Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

//GET Get all movies
router.get('/getMovies', async (req, res) => {
    try {
        // Find all movies
        const movies = await Movies.find();

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

//GET Get a movie
router.get('/getSingleMovie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movies.findById(movieId);
        if (!movie) {
            res.status(404).json({ msg: "Movie Not Found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
})

//PUT update existing movie
router.put('/updateMovie/:id', [
    //Using express Validator
    body('name', 'Please Enter name of movie').notEmpty().withMessage("Please Enter Name of Movie"),
    body('img', 'Please Enter image URL').notEmpty().withMessage("Please Enter Image of Movie").isURL().withMessage("Enter a URL only"),
    body('summary', 'Please Enter summary').isLength({ min: 20 }).withMessage("Summary must be for minimum 3 words").notEmpty().withMessage("Please Enter Summary of Movie")
], async (req, res) => {

    try {
        const { name, img, summary } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        const movieId = req.params.id;
        const movie = await Movies.findById(movieId);
        if (!movie) {
            return res.status(404).json({ msg: "Movie Not Found" })
        }

        Movies.findByIdAndUpdate(movieId, { name, img, summary })
            .then(() => {
                res.status(200).json({ msg: "Movie Updated" });
            }).catch(err => res.status(500).json({ msg: err }))

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ msg: error })
    }

})


// DELETE /movie/deleteMovie/:id to delete add or created movie from database
router.delete('/deleteMovie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        // Check if the movie exists
        const movie = await Movies.findById(movieId);

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        // If the movie exists, delete it
        await Movies.findByIdAndDelete(movieId);

        res.status(200).json({ msg: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});




module.exports = router