const express = require('express')
const FamilyGroup = require("../models/FamilyGroup.js");
const Notifications = require("../transports/notifications.js");
const User = require("../models/User.js");
const path = require("path")
var bodyParser = require('body-parser');
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());  
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
    var authorization = req.header('auth-token');
    if (authorization) {
    var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    var userId = decoded._id;
    console.log(decoded.email,"emails")
    var senderEmail=decoded.email
    }

  
const isCreatorprev=await FamilyGroup.find({creator:userId })

    if(isCreatorprev.length==0){
        const group= FamilyGroup.create({userId:userId,creator:userId,status:"Yes"});
}
const finduser = await User.find({email: { $in: req.body.email }});
console.log(finduser)
const duplicatedata =finduser.filter((item)=>{
    return item._id
})

    const duplicate =await FamilyGroup.find({userId:{ $in:duplicatedata },creator:userId}).populate({path: 'userId', model: 'User'});

if(duplicate.length>0){
  return  res.status(200).json({message:"Duplicate Data",data:duplicate});
  
}

const saveGroup =[];

const userarray = finduser.map(async(user) => {
    
    const group = new FamilyGroup({userId:user._id,creator:userId,status:"pending"});
     if(user.fcm_token)
 Notifications.sendNotification("Add To Family Group",user.fcm_token,`${senderEmail} wants to add in Family Group`);
    await User.updateOne(
        { _id: user._id },
        { $set: { is_family_group: true} }
      );

    const result =await group.save()
    
     saveGroup.push(result);
})
res.status(200).json("Added Successfully");
   

}


exports.get = async (req, res) => {
    var authorization = req.header('auth-token');
    if (authorization) {
    var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    var userId = decoded._id;
    }
  
const findgroup = await FamilyGroup.find({userId:userId,status:"pending"}).populate({path: 'creator', model: 'User'});
res.status(200).json({data:findgroup});

}
exports.getGroup= async (req, res) => {
    var authorization = req.header('auth-token');
    if (authorization) {
    var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    var userId = decoded._id;
    }
//     const isCreator= await FamilyGroup.find({creator:userId, userId: {$ne:userId}})
//    console.log(isCreator)
//    console.log(isCreator.length)
//    var add={}
//     if(isCreator.length>0){
//         const isprev= await FamilyGroup.find({userId:userId,creator:userId})
//         console.log("heree")
//         if(isprev.length==0){
//   add= FamilyGroup.create({userId:userId,creator:userId,status:"Yes"});
//         }
//        }
 
const findgroup = await FamilyGroup.find({userId:userId,status:"Yes"});
console.log(findgroup)
if(findgroup.length>0){
   
const groupMembers=await FamilyGroup.find({creator:findgroup[0].creator,status:"Yes"}).populate('userId')

if(groupMembers)

res.status(200).json({data:groupMembers});
}
else
res.status(200).json({data:[]});
}
exports.update = (req,res) =>{

    // Find note and update it with the request body
    var authorization = req.header('auth-token');
    if (authorization) {
    var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    var userId = decoded._id;
    }
if(req.body.status=='No'){
    FamilyGroup.remove({_id:req.params.id}) .then(update => {
    res.status(200).json({data:update});
})

}
else{
    FamilyGroup.findByIdAndUpdate(req.params.id, 
      req.body
    ,{new: true})
    .then(update => {
        res.status(200).json({data:update});
    })
}
}

exports.leaveGroup= async(req, res) =>{

  var authorization = req.header('auth-token');
    if (authorization) {
    var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    var userId = decoded._id;
    }
    const findgroup = await FamilyGroup.findOneAndDelete({userId:userId,status:'Yes',creator: {$ne:userId}});
    console.log("findgroup",findgroup)
   if(findgroup!=null){

    res.status(200).json({msg:`${decoded.email} Left successfully` });
   }
   else
   res.status(200).json({msg:`${decoded.email} cannot leave group as he is creator`});
}