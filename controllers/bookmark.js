const express = require('express');
const Bookmark = require("../models/Bookmark.js");

const jwt = require("jsonwebtoken");


exports.create = async(req,res) =>{

console.log(req.body.data)
    var authorization = req.header('auth-token');
        var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
            var userId = decoded._id;
        const checkData = await Bookmark.findOneAndDelete({user:userId});
    
           const generalyou =  Bookmark.create({
               bookmark:req.body.data,
            
               user:userId,
            });
            return res.status(200).json({status:true,msg:"bookmark added"})


        









}

exports.get = async(req,res) =>{


    var authorization = req.header('auth-token');
        var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
            var userId = decoded._id;

var user=req.body.user
console.log(req.body.user)
const checkData = await Bookmark.find({user:user})

return res.status(200).json({status:true,data:checkData,msg:"bookmark sent"})
}