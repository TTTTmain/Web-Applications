const Movie = require('./Model/Movie');
const Actor = require('./Model/Actor');
const mongoose = require('mongoose');
const { json } = require('body-parser');

module.exports = {
    getAll:(req,res)=>{
        Actor.find({}).populate('movie','name bYear').exec((err,actor)=>{
            if(err) return res.status(400).json(err);
            return res.json(actor);
        });
    },
    getOne:(req,res)=>{
        Actor.findOne({_id:req.params.id}).populate('movie','name bYear').exec((err,actor)=>{
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(400).json();

            return res.json(actor);
        });
    },
    createOne: (req,res) =>{
        let actorDeatil = req.body;
        actorDeatil._id = new mongoose.Types.ObjectId();

        let actor = new Actor(actorDeatil);

        actor.save((err)=>{
            console.log('Done');
            res.json(actor);
        });
    },
    
    updateOne:(req,res)=>{
        Actor.findOneAndUpdate({_id:req.params.id},req.body,(err,actor)=>{
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(400).json();

            return res.json(actor);
        });
    },

    deleteOne:(req,res)=>{
        Actor.findOneAndRemove({_id:req.params.id},(err)=>{
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    addMovie:(req,res)=>{
        console.log(req.params);
        Actor.findOne({_id:req.params.id},(err,actor)=>{
            if(err) return res.status(400).json(err);
            if(!actor) return res.status(404).json();

            Movie.findOne({_id: req.params.mid}, (err,mData)=>{
                if(err) res.status(400).json({"err":err});
                if(!mData) return res.status(404).json({"err":"Movie not found"});

                actor.movie.push(mData._id); //Add movie to actor's movie list
                mData.actors.push(req.params.id); //Add actor to movie's actor list

                actor.save((err)=>{
                    mData.save((err)=>{
                        if(err) return res.status(500).json({"err":err});
                        console.log(`[*] ${actor.name} is added to ${mData.name} actors list.`)
                    });
                    if(err) return res.status(500).json({"err":err});
                    console.log(`[*] ${mData.name} is added to ${actor.name} movie list.`);
                    return res.json({"actor":actor, "movie":mData});
                });
                
            });
        });
    },
    //Lab tasks
    deleteActorAndMovie:(req,res)=>{
        let toRetJson = [];
        Movie.deleteMany({actors:req.params.id},(err,toDel)=>{
            if(err) return res.status(400).json(err);
            toRetJson.push({"deleteMovie":toDel});
        });

        Actor.deleteOne({_id:req.params.id},(err,delRes)=>{
            if(err) return res.status(400).json(err);
            toRetJson.push({"deleteActor":delRes});
            return res.json(toRetJson);
        })
        
    },
    deleteActorMovie:(req,res)=>{
        let resArray = [];
        console.log(req.params);
        Actor.updateOne({_id:req.params.aId},{$pull:{movie:req.params.mId}},(err,aResult)=>{
            if(err) return res.status(400).json(err);
            if(!aResult) return res.status(404).json();
            console.log(aResult);
            resArray.push(aResult);
            Movie.updateOne({_id:req.params.mId},{$pull:{actors:req.params.aId}},(err,mResult)=>{
                if(err) return res.status(400).json(err);
                if(!mResult) return res.status(404).json();
                resArray.push(mResult);
                console.log(mResult)
                return res.json({"actor":aResult,"movie":mResult});
            });
        });
    },
    getActorByyear:(req,res)=>{
        let toRetArr = [];
        Actor.find({}).populate('movie','bYear').exec((err,actor)=>{
            if(err) return res.status(400).json(err);
            for(let i=0;i<actor.length;i++){ 
                for(let x=0;x<actor[i].movie.length;x++){
                    if(actor[i].movie[x].bYear == parseInt(req.params.year)){
                        console.log(actor[i])
                        toRetArr.push({"name":actor[i].name,"bYear":actor[i].bYear,"movieName":actor[i].movie[x].name});
                    }
                }
            }
            console.log(toRetArr);
            return res.json(toRetArr);
        });
    },tma:(req,res)=>{
        let actorarr=[];
        Movie.find({year:req.params.year}).populate('actors','name').exec(function (err, data) {
            if (err) return res.status(404).json(err);
                for(var i=0;i<data.length;i++){
                    console.log(data[i]);
                    for(var j=0;j<data[i].actors.length;j++){
                        actorarr.push(data[i].actors[j]);
                    }
                }
                res.json(actorarr);
        });
        
    },

    lab9:(req,res)=>{
        Actor.find({bYear:{$gte:parseInt(req.params.year)}}).populate('movie','name').exec((err,data)=>{
            if(err) return res.status(400).json(err);
            console.log(data);
            res.json(data);
        });
    }
}