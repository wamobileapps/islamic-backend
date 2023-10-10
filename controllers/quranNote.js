const express = require('express');
const QuranNotes = require("../models/QuranNotes");
const DescLanguages = require("../models/DescLanguages")
const jwt = require("jsonwebtoken");
const exp = require('constants');
const UserNotes = require('../models/UserNotes');

//// create
exports.create = async (req, res) => {
    if (!req.body.page_id || !req.body.description) {
        return res.status(422).send({
            page_id: "Required!"

        })
    }
    try {
        const authorization = req.header('auth-token')
        // return res.status(200).json({auth: authorization, token: process.env.TOKEN_SECRET})
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user_id = decode._id

        const checkData = await QuranNotes.findOne({
            "user_id": user_id,
            "page_id": req.body.page_id
        })
        //  return res.status(200).json({data:checkData,_id:decode._id})
        if (checkData != null) {
            const updatedData = await QuranNotes.updateOne({
                    page_id: req.body.page_id,
                    user_id: user_id
                },
                // this row contains fix with $set oper
                {
                    $set: {
                        description: req.body.description
                    }
                });
            return res.status(200).json({
                data: updatedData,
                msg: "updated"
            });
        } else {
            if (!req.body.language) {

                const quranNote = new QuranNotes({
                    page_id: req.body.page_id,
                    user_id: user_id,
                    description: req.body.description,
                    language: "english"
                });

                const saveQuranNotes = await quranNote.save();
                return res.status(200).send({
                    data: saveQuranNotes
                });
            } else {
                //    const quranNoteWithAnotherLang =  new DescLanguages({
                //     page_id: req.body.page_id,
                //     // user_id:user_id,
                //     description: req.body.description,
                //     language:req.body.language
                const language = await DescLanguages.find({
                    language: req.body.language
                })
                console.log(language);
                let obj = {
                    page_id: req.body.page_id,
                    user_id: user_id,
                    description: req.body.description,
                    language: language._id
                }
                const addQuranNote = new QuranNotes(obj)

                const savequranNoteWithAnotherLang = await addQuranNote.save();


                return res.status(200).send({
                    data: savequranNoteWithAnotherLang
                })
            }
        }

    } catch (error) {
        return res.status(500).send(error)
    }
};
exports.createNewNote= async(req,res)=>{
    if (!req.body.page_id || !req.body.description) {
        return res.status(422).send({
            page_id: "Required!"

        })
    }
    try {
        const authorization = req.header('auth-token')
        // return res.status(200).json({auth: authorization, token: process.env.TOKEN_SECRET})
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user_id = decode._id

        const checkNote= await QuranNotes.find({page_id:req.body.page_id,user_id:user_id})
      console.log(checkNote)

      
      if(checkNote==[]||checkNote==null){
          const lang = await DescLanguages.findOne({language:req.body.language})
          if(checkNote.language== req.body.language){
            const updatedData = await QuranNotes.updateOne({
                page_id: req.body.page_id,
                user_id: user_id
            },
            // this row contains fix with $set oper
            {
                $set: {
                    description: req.body.description
                }
            });
        return res.status(200).json({
            data: updatedData,
            msg: "updated"
        });
          } 
      }else{
        let obj = {
            page_id: req.body.page_id,
            user_id: user_id,
            description: req.body.description,
            language: req.body.language
          }
          const addNewNote = new QuranNotes(obj)
          const saveNote = await addNewNote.save()
          return res.status(200).json({status:true,msg:"Note added",data:saveNote})
      }
        
    } catch (error) {
        return res.status(500).json(error)
    }




}

//// get

exports.get = async (req, res) => {
    try {
        const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk0OGY2ODFhNmQ4ZDY5MjYwYWY0ZjkiLCJyb2xlIjoidXNlciIsImlhdCI6MTY1NTQ0NjEzNX0.1z1UO3ymSPBxsG4Vd5sNiCmiGm4eZNcBJc9Y5oo1Coo"


        if (authorization) {
            const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
            const userId = decode._id;
            const notes = await QuranNotes.find({
                "user_id": userId,
                "page_id": req.params.page_id
            })
            res.status(200).send(notes)
        } else {
            res.status(401).send({
                message: "User dose't exist!"
            })
        }
    } catch (error) {
        return res.status(500).send(error)
    }

}

//==== test

exports.test = async (req, res) => {
    try {


        const notes = await QuranNotes.find({
            "page_id": req.params.page_id
        })

        res.status(200).send({
            data: notes
        })


    } catch (error) {
        return res.status(500).send(error)
    }

}


//// update

exports.update = async (req, res) => {

    try {
        const note_id = req.params._id
        if (note_id) {
            await QuranNotes.findByIdAndUpdate(note_id, req.body, {
                new: true
            }, (error, data) => {
                if (!error) {
                    return res.status(200).send({
                        data: data,
                        msg: "Update Successfully"
                    })
                } else {
                    return res.status(400).send(error)
                }
            })
        }

    } catch (error) {
        return res.status(400).send(error)
    }


};

// ====== get language

exports.get = async (req, res) => {
    try {
        const languages = await DescLanguages.find();

        res.status(200).send({
            data: languages
        })
    } catch (error) {
        return res.status(400).send(error)
    }
}

exports.addLang = async (req, res) => {
    try {
        const check = await DescLanguages.findOne({
            language: req.body.language
        })
        console.log(check);
        if (check != null) {
            if (check.language == req.body.language) {

                return res.status(200).json({
                    status: false,
                    msg: "language already exist"
                })
            }
        } else {
            const addLang = new DescLanguages(req.body)
            const saveLang = await addLang.save()
            return res.status(200).json({
                status: true,
                data: saveLang
            })
        }

    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.deleteLang = async (req, res) => {
    try {
        const data = await DescLanguages.deleteMany()
        res.status(200).json("deleted")
    } catch (error) {
        return res.json(error)
    }
}