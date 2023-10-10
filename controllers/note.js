const express = require('express')
const Note = require("../models/Note");
const jwt = require("jsonwebtoken");

exports.list = async (req, res) => {
    try {
        var authorization = req.header('auth-token');
        const date = new Date();
        if (authorization) {
        var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
        var userId = decoded._id;
        }
        const notes = await Note.find({ user_id:userId}).lean();
     
        res.status(200).json(({data:notes,msg:"Todo listed Successfully."}));
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
    const notes = new Note({...req.body,user_id:userId});


    try {
        const saveNote = await notes.save();
        res.status(200).json(saveNote);
    } catch (error) {
        res.status(400).send(error);
    }
}


exports.edit = (req,res) =>{

    Note.findByIdAndUpdate(req.params._id,req.body ,{new: true})
    .then(todos => {


        if(!todos) {
            return res.status(404).send({
                message: "Note not found with id " + req.params._id
            });
        }
      
      return  res.status(200).json(({data:todos,msg:"Updated Successfully."}));
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params._id
            });                
        }
      
    });
}


exports.update = (req,res) =>{

    // Find note and update it with the request body
    Todo.findByIdAndUpdate(req.params._id, {
        title: req.body.title || false,
        description: req.body.description || false,
        date:req.body.date || false
        
    }, {new: true})
    .then(todos => {
        if(!todos) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params._id
            });
        }
        res.send(todos);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Todo not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating Todo with id " + req.params._id
        });
    });
}



exports.delete = async (req,res) => {

    Note.findByIdAndRemove(req.params._id)
    .then(todos => {
        if(!todos) {
            return res.status(404).send({
                message: "Note not found with id " + req.params._id
            });
        }
        res.send({message: " Deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Note with id " + req.params._id
        });
    });
  }