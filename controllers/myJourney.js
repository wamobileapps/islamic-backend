const express = require('express')
const MyJourney = require("../models/MyJourney");
const jwt = require("jsonwebtoken");
exports.list = async (req, res) => {
console.log('heryyy');
    try {
        var authorization = req.header('auth-token');
        if (authorization) {
        var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
        var userId = decoded._id;
        }
        const myJourney = await MyJourney.find({user_id:userId});
        myJourney.sort((b,a) => parseFloat(a.year) - parseFloat(b.year));
        res.status(200).json(({data:myJourney,msg:"MyJourney listed Successfully."}));
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.create = async (req, res) => {

    var authorization = req.header('auth-token');
    if (authorization) {
    var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    var userId = decoded._id;
    }

    const myJourney = new MyJourney({
        title:req.body.title,
        description:req.body.description,
        year:req.body.year,
        age:req.body.age,
        user_id: userId
    });


    try {
        const saveMyJourney = await myJourney.save();
        res.status(200).json(saveMyJourney);
    } catch (error) {
        res.status(400).send(error);
    }
}


exports.edit = (req,res) =>{

    MyJourney.findById(req.params._id)
    .then(myJourney => {
        if(!myJourney) {
            return res.status(404).send({
                message: "myJourney not found with id " + req.params._id
            });
        }
        res.json(myJourney);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "myJourney not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not find myJourney with id " + req.params._id
        });
    });
}


exports.update = (req,res) =>{

    // Find note and update it with the request body
    MyJourney.findByIdAndUpdate(req.params._id, {
        title: req.body.title || false,
        description: req.body.description || false,
    }, {new: true})
    .then(myJourney => {
        if(!myJourney) {
            return res.status(404).send({
                message: "myJourney not found with id " + req.params._id
            });
        }
        res.send(myJourney);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "myJourney not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating myJourney with id " + req.params._id
        });
    });
}



exports.delete = async (req,res) => {

    MyJourney.findByIdAndRemove(req.params._id)
    .then(myJourney => {
        if(!myJourney) {
            return res.status(404).send({
                message: "myJourney not found with id " + req.params._id
            });
        }
        res.send({message: "myJourney deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "myJourney not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete myJourney with id " + req.params._id
        });
    });
  }