const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        min:6
    },
    gender:{
        type:String,
        required:true,
    },
    user_role:{
        type:String,
    },
    token:{
        type:String,
    },
    birthday: { 
        type: String,
     },
    mobile_number:{
        type:String,
        required:true,
        min:6
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    date:{
        type:Date,
       default:Date.now
    },
    resetPasswordExpires:{
        type:String,
        default:'null'
    },
    resetPasswordToken:{
        type:String,
        default:'null'
    },
    status:{
        type:Boolean,
        default:0
    },
    profile_image:{
        type:String,
        default:'null'
    },
    subscription_type:{
        type:String,
        default:'null'
    },
    subscription_status:{
        type:String,
        default:0
    },
    subscription_date:{
        type:Date
    },
    readQuranData:{
        type:Number,
        default:0
    },
    current_value:{
        type:Number,
        default:0
    },
    readedData: {
        type:Number,
        default:0
    },
    quranUpdatedData: {
        type:String,
        default:null
    },
    time_zone: {
        type:String,
        default:null
    },
    fcm_token: {
        type:String,
        default:null
    },
    is_family_group: {
        type:Boolean,
        default:false
    },
    is_family_tree: {
        type: Schema.ObjectId,
        default:null
    },
    is_family_tree: {
        type: Schema.ObjectId,
        default:null
    },
    user_inactive:{
        type:Boolean,
        default:false
    },
    recentItems: {
        values:{
            name:String,
            pageName:String,
            Index:Number,
            sno:String
        },
        default:{}
    }
});

module.exports = mongoose.model('User',UserSchema)