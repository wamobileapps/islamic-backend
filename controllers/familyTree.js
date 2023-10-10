const FamilyTree= require("../models/FamilyTree")
const UserArray = require('../models/UserArray');
const Family = require("../models/Family")
const User =require("../models/User")
const express = require('express')
const jwt = require("jsonwebtoken");
const multer =require("multer");
// for parsing multipart/form-data

exports.createFamilyolddd = async (req, res) => {
   

    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
                  cb(null, './uploads/familyTree');
                },
                filename: function (req, file, cb) {
                  cb(null, file.originalname);
              }
      });
      var upload = multer({
        storage: storage
      }).any();
      
      
 
    
const typeArray = [{
    id:1,
    name:"Person"
},
{
    id:2,
    name:"Father"
},{
    id:3,
    name:"Mother"
},
{
    id:4,
    name:"Wife"
}
,
{
    id:5,
    name:"Son"
}
,{
    id:6,
    name:"Daughter"
}
,{
    id:7,
    name:"Brother"
},
{
    id:8,
    name:"Sister"
},
{
    id:9,
    name:"Husband"
}
]

    try {
        

        const authorization = req.header("auth-token")
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user_id = decode._id
        var createData=null
    
       
           
      
        upload(req, res, async function(err) {
           
            console.log(req.body);
            if(req.body.family_id ){
            if (err) {
                console.log("hereeeeeeeeeeeeeeeeeeee");
                return res.json(err);
            } else {
              
                
                if(req.files[0]?.originalname){
                 filename = req.files[0]?.originalname;
                }
                else if(req.body.profile_image){
                    filename = req.body.profile_image;
                   }
               createData =await FamilyTree.create({...req.body,profile_image:filename})
          
            }
            res.status(200).json({ status: true, msg: "Values Added", data: createData })
          
        }
        else{
           
          
            const entry ={
                name:req.body.family_name
            }
          
          
                if (err) {
                    return res.json(err);
                } else {
                  
                    if(req.files[0]?.originalname){
                     filename = req.files[0]?.originalname;
                    }
                    else if(req.body.profile_image){
                        filename = req.body.profile_image;
                       }
            const createData = new Family(entry)
            const saveData = await createData.save()
            
            
            
            User.findOne({ _id: user_id }, function(err, doc) {
                if (err) {
                  console.log(err);
                } else {
                  doc.is_family_tree = saveData._id;
                  doc.save(function(err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Successfully updated document!");
                    }
                  });
                }
              });




                     console.log(saveData);
            const createfmData = new FamilyTree({...req.body,family_id:saveData._id, profile_image:filename})
            const savefmData = await createfmData.save()
            res.status(200).json({ status: true, msg: "Values Added", data: savefmData })
        }
    }
    
  
  
    
    }) 
}catch (error) {
    console.log("hereee")
        res.status(500).json({ error })
    }

}

exports.createFamily = async (req, res) => {
    
    try {
        const authorization = req.header("auth-token")
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user_id = decode._id
        var createData = null
        var filename='';
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/familyTree');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });
        
        const upload = multer({ storage: storage }).any();
        
        upload(req, res, async function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error uploading file" });
            }
            

            if (!req.body.family_id) {
                const entry = {
                    name: req.body.family_name
                }
            
                try {
                    const createData = await Family.create(entry);
                    const saveData = await createData.save();
                    
                    User.findOneAndUpdate({ _id: user_id }, { is_family_tree: saveData._id }, function(err) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: "Error updating user" });
                        }
                    });

                    const createfmData = new FamilyTree({...req.body,family_id:saveData._id, profile_image:filename})
                    const savefmData = await createfmData.save()
                    res.status(200).json({ status: true, msg: "Values Added", data: savefmData })
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Error creating family" });
                }
            } else {
                try {
                    const filename = req.files[0]?.originalname || '';
                    const createData = await FamilyTree.create({...req.body,profile_image:filename});
                    res.status(200).json({ status: true, msg: "Values Added", data: createData });
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ error: error.message });
                }
            }
        });
    } catch (error) {
        console.log(error),"DFfdfdsdfsfdsfsdfdsf";
        return res.status(500).json({error: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const authorization = req.header("auth-token");
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET);
        const user_id = decode._id;
        const family_id = req.params._id;

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads/familyTree');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });

        const upload = multer({ storage: storage }).any();

        upload(req, res, async function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error uploading file" });
            }

            const body = req.body;
            const updateData = { ...body };

            if (req?.files?.length > 0) {
                updateData.profile_image = req.files[0].originalname;
            }
            else if(req.body.profile_image){
                updateData.profile_image= body.profile_image;
               }

            try {
                const updatedFamily = await FamilyTree.findOneAndUpdate({ _id: family_id }, updateData, { new: true });

                if (!updatedFamily) {
                    return res.status(404).json({ error: "Family not found" });
                }

                res.status(200).json({ status: true, msg: "Values Updated", data: updatedFamily });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Error updating family" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}


  

  

// exports.update = async(req,res) =>{
//     try {

//         console.log(req.body);
//         const purification =  await FamilyTree.findByIdAndUpdate(req.params._id, req.body, { new: true });
//         return res.json({data:purification,msg:"User data updated successfully"});
     
//     } catch (error) {
//       return res.status(400).json(error);
//     }
// }


exports.delete = async (req,res) => {

    FamilyTree.findByIdAndRemove(req.params._id)
    .then(info => {
        if(!info) {
            return res.status(404).send({
                message: "Member not found with id " + req.params._id
            });
        }
        res.send({message: "Member deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Member not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Member with id " + req.params._id
        });
    });
  }

  exports.getRelation = async (req,res) => {
try{
  const info=await  FamilyTree.findById(req.params._id)

        if(info.length==0) {
            return res.status(200).send({
                data:[],
                message: "No drelation data for user" + req.params._id
            });
        }
        
        const getrelationArray = await FamilyTree.find({"relatedTo":req.params._id})

        res.send({ data:getrelationArray,
            message: "Data sent successfully"});
        }
 

        catch (error) {
            res.json({ error })
        }
  }




exports.getFamilyData = async (req, res) => {
    try {
        const authorization = req.header("auth-token")
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const getDailyDataddfd = await FamilyTree.find({ "family_id": req.params.family_id })
        const user_id = decode._id
        console.log("ffgfgffg",getDailyDataddfd)
        const getDailyData = await FamilyTree.find({ "family_id": req.params.family_id }).lean().populate({path: 'relatedTo', model: 'FamilyTree'}).populate({
            path: 'relatedTo',
            // Get friends of friends - populate the 'friends' array for every friend
            populate: {path: 'relatedTo', model: 'FamilyTree'}
        }).exec()
console.log("ffgfgffg")
        for(let i=0;i<getDailyData.length;i++){
            const getrelationArray = await FamilyTree.find({ "family_id": req.params.family_id ,"relatedTo": getDailyData[i]._id})
            getDailyData[i]._id
            console.log(getrelationArray)
            getDailyData[i].relatives=getrelationArray
        }
        // .populate({path: 'relatedTo', model: 'FamilyTree'}).populate({
        //     path: 'relatedTo',
        //     // Get friends of friends - populate the 'friends' array for every friend
        //     populate: {path: 'relatedTo', model: 'FamilyTree'}
        // }).exec();
       
        res.json({ status: true, data: getDailyData })

console.log(decode);
    } catch (error) {
        res.json({ error })
    }
}

exports.getPersonData= async (req, res) => {
    try {
        const authorization = req.header("auth-token")
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user_id = decode._id
        const personData = await FamilyTree.find();
       
        res.json({ status: true, data: personData})

console.log(decode);
    } catch (error) {
        console.log("dfssf")
        res.json({ error })
    }
}




exports.createUser = async (req, res) => {
    const { users } = req.body;
    var authorization = req.header('auth-token');
    if (authorization) {
      var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
      var userId = decoded._id;
    }
  
    try {
      // check if the user already has an array of users
      let userArray = await UserArray.findOne({ user_id: userId }).lean();
      if (userArray) {
        // if the user has an array of users, append new users to the existing array
        const updatedUsers = [...userArray.users, ...users];
        userArray = await UserArray.findOneAndUpdate(
          { user_id: userId },
          { users: updatedUsers, updated_at: Date.now() },
          { new: true }
        ).lean();
      } else {
        // if the user doesn't have an array of users, create a new array
        userArray = new UserArray({ users, user_id: userId });
        userArray = await userArray.save();
      }
      res.status(201).json(userArray);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  exports.getUser = async (req, res) => {
    var authorization = req.header('auth-token');
    if (authorization) {
      var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
      var userId = decoded._id;
    }
    try {
      const userArray = await UserArray.findOne({ user_id: userId }).lean();
      res.status(200).json(userArray);
    } catch (error) {
      res.status(400).send(error);
    }
  };


