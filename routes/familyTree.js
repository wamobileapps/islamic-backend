const FamilyTree= require("../models/FamilyTree")
const Family = require("../models/Family")
const User =require("../models/User")
const express = require('express')
const jwt = require("jsonwebtoken");
const multer =require("multer");
// for parsing multipart/form-data

exports.createFamily = async (req, res) => {
   
  
    
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
    
       
           
        const check = await Family.findOne({ "family": req.body.family_id })
        upload(req, res, async function(err) {
            console.log(req.body);
            if(req.body.family_id ){
            if (err) {
                console.log("hereeeeeeeeeeeeeeeeeeee");
                return res.json(err);
            } else {
              
              const filename = req.files[0].originalname;
               createData =FamilyTree.create({...req.body,profile_image:filename})
          
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
                    const filename = req.files[0].originalname;
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



exports.update = async(req,res) =>{
    try {

        console.log(req.body);
        const purification =  await FamilyTree.findByIdAndUpdate(req.params._id, req.body, { new: true });
        return res.json({data:purification,msg:"User data updated successfully"});
     
    } catch (error) {
      return res.status(400).json(error);
    }
}


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
