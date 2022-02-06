const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const actorsRouter = require('./actorRouter');
const moviesRouter = require('./movieRouter');
const bodyParser = require('body-parser');
const actorRouter = require('./actorRouter');

const conString = "mongodb://localhost:27017/movies";

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//Database connection
mongoose.connect(conString,(err)=>{
    if(err){
        console.log(err);
        return console.log("[!!] Mongoose connection error.");
    }
    console.log("[*] Data base is connected");
});

//EXT
router.get('/movies/actrosByMovie/:year',actorRouter.tma);

//Actor API endpoints
router.get('/actors', actorsRouter.getAll);
router.post('/actors', actorsRouter.createOne);
router.get('/actors/:id', actorsRouter.getOne);
router.put('/actors/:id', actorsRouter.updateOne);
router.put('/actors/:id/movies/:mid', actorsRouter.addMovie);//[5] Code modified from the pre-reading
router.delete('/actors/:id', actorsRouter.deleteOne);

//Movie API endpoints
router.get('/movies', moviesRouter.getAll);
router.post('/movies', moviesRouter.createOne);
router.get('/movies/:id', moviesRouter.getOne);
router.put('/movies/:id', moviesRouter.updateOne);


//Lab API endpoints
router.delete('/movies/:id',moviesRouter.deleteOne); //[1]
router.delete('/actors/:id/delactormovie',actorsRouter.deleteActorAndMovie);//[2]
router.delete('/actor/:aId/delmovie/:mId',actorsRouter.deleteActorMovie);//[3][4]
router.get('/movies/:bStart/:bEnd',moviesRouter.getMovieBetweenYear);
router.delete('/movie/del',moviesRouter.deleteMovieBetweenYear);
router.delete('/actor/:aId',actorsRouter.deleteActorAndMovie);
router.delete('/movies/delbeforeyear/:bYear',moviesRouter.delMovieBeforeYear);
module.exports = router;

//L9
router.get('/actor/year/:year',actorRouter.lab9);