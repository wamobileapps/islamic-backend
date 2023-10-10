const UserType = require("../models/UserType")

exports.addUsertype= async(req,res)=>{
    const userId = req.params.id
    try {
let newEntry = {
    name:req.body.name,
}

       const addUserType= new UserType(newEntry)
       const saveData = await addUserType.save()
       return res.status(200).json({status:true,data:saveData}) 
    } catch (error) {
        return res.status(500).json(error)
    }
}
exports.getUserType = async(req,res)=>{
    const userId = req.params.id
    try {
        const findUserType = await UserType.find({user:userId})
        return res.status(200).json({status:true,data:findUserType})
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