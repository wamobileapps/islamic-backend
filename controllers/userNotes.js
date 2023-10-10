const UserNotes = require("../models/UserNotes")

exports.addNotes= async(req,res)=>{
    const userId = req.params.id
    try {
let newEntry = {
    title:req.body.title,
    desc:req.body.desc,
    textColor:req.body.textColor,
    user:userId
}

       const addNote= new UserNotes(newEntry)
       const saveData = await addNote.save()
       return res.status(200).json({status:true,data:saveData}) 
    } catch (error) {
        return res.status(500).json(error)
    }
}
exports.getNotes = async(req,res)=>{
    const userId = req.params.id
    try {
        const findNotes = await UserNotes.find({user:userId})
        return res.status(200).json({status:true,data:findNotes})
    } catch (error) {
        return res.status(500).json(error)
    }
}
exports.updateNote= async(req,res)=>{
const noteId= req.params.id
try {
    const updateNote = await UserNotes.findByIdAndUpdate(noteId,req.body,{new:true})
    return res.status(200).json({status:true,data:updateNote,msg:"note updated"})
} catch (error) {
    return res.status(500).json(error)
}

}
exports.deleteNote = async(req,res)=>{
    const noteId = req.params.id
    try {
        const deleteNote = await UserNotes.findByIdAndRemove(noteId)
        return res.status(200).json({status:true,msg:"Note delete"})
    } catch (error) {
        return res.status(500).json(error)
    }
}