/*
EG/2019/3629
Karunasundara K.M.S.N.
Assignment 02
*/

const express = require('express');
const mongoose=require('mongoose');
const app = express();
const Movie=require('./models/movieModel');

//middlewares
app.use(express.json());//JSON middleware
app.use(express.urlencoded({extended: false}));//JSON converting middleware

//test get request
app.get('/',(req,res)=>{
    res.send("Hello Nodeapi");
})

//Get all the movies
app.get('/movies', async(req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get a movie by ID
app.get('/movies/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Post a movie
app.post('/movies', async(req, res) => {
    try {
        const movie  = await Movie.create(req.body)
        res.status(200).json(movie);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update an existing movie details
app.put('/movies/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!movie){
            return res.status(404).json({message: `cannot find any movie with ID ${id}`})
        }
        const updatedMovie = await Movie.findById(id);
        res.status(200).json(updatedMovie);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//delete a movie
app.delete('/movies/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if(!movie){
            return res.status(404).json({message: `cannot find any movie with ID ${id}`})
        }
        res.status(200).json(movie);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Port defining
const port=3000;


//Database connection and verifying through ATLAS
mongoose.connect('mongodb+srv://saranga:sara123@cluster0.y2hvk77.mongodb.net/OMDB?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
        console.log(`OMDB app is listening on port ${port}`)
      })
}).catch(error=>{
    console.log(error)
})
;