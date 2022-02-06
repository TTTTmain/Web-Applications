const Movie = require('./Model/Movie');
const Actor = require('./Model/Actor');
const mongoose = require('mongoose');
const http = require('http');

module.exports = {
    getAll: (req,res)=>{
        Movie.find().populate('actors','name bYear').exec((err,movie)=>{
            if(err) return res.status(400).json(err);
            return res.json(movie);
        })
    },
    createOne: (req,res)=>{
        let movieDetail = req.body;
        movieDetail._id = new mongoose.Types.ObjectId();

        Movie.create(movieDetail,(err,movie)=>{
            if(err) return res.status(400).json(err);
            return res.json(movie);
        });
    },

    getOne:(req,res)=>{
        Movie.findOne({_id:req.params.id}).populate('actors','name bYear').exec((err,movie)=>{
            if(err) res.status(400).json(err);
            if(!movie) res.status(404).json

            return res.json(movie);
        });
    },

    deleteOne:(req,res)=>{
        Movie.deleteOne({_id: req.params.id},(err,stat)=>{
            if(err) return res.status(400).json(err);
            return res.json(stat);
        });
    },

    updateOne: (req,res)=>{
        Movie.findOneAndUpdate({_id:req.params.id},req.body,(err,movie)=>{
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404),json();

            return res.json(movie);
        });
    },

    //Lab tasks
    getMovieBetweenYear:(req,res)=>{
        let searchQuery = {
            $and:[
                    {bYear:{$gte:req.params.bStart}},
                    {bYear:{$lte:req.params.bEnd}}
                ]
        }
        Movie.find(searchQuery).sort({_id:1}).exec((err,movie)=>{
            return res.json(movie);
        });
        
    },
    deleteMovieBetweenYear: (req,res)=>{
        console.log(req.body);
        let deleteQuery = {
            $and:[
                    {bYear:{$gte:req.body.bStart}},
                    {bYear:{$lte:req.body.bEnd}}
                ]
        }
        Movie.deleteMany(deleteQuery,(err,result)=>{
            if(err) res.status(400).json(err);
            return res.json(result);
        });    
    },

    delMovieBeforeYear:(req,res)=>{
        let delQuery = {
            bYear:{$lt:req.params.bYear}
        }

        Movie.deleteMany(delQuery,(err,result)=>{
            if(err) res.status(400).json(err);
            return res.json(result);
        });    
    }
    
}