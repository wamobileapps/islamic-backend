const express = require('express')
const DailyPurifications = require("../../models/DailyPurifications.js");
const NotificationsModel = require("../../models/Notification.js");
const User = require("../../models/User.js");
const Todo = require("../../models/Todo.js");
const Notifications = require("../../transports/notifications.js");
var cron = require('node-cron');
const jwt = require("jsonwebtoken");
var calculate = function (time, minutes,checkNegetive) {
    const a=time.split(':')
  
    var addMinutes = minutes % 60;
    var addHours = (minutes - addMinutes) / 60;
    var currentHours = checkNegetive ? Number(a[0])+ addHours :Number(a[0])- addHours;
    var currentMinutes = checkNegetive ? addMinutes + Number(a[1]):addMinutes - Number(a[1]);
    if (currentMinutes >= 60) {
      currentMinutes = currentMinutes - 60
      currentHours = currentHours + 1
    }
    time = `${currentHours}:${currentMinutes}`
    return time;
  }
exports.sendDailyNotificationForPurification = async (req, res) => {
   
   try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    var date = yyyy+'-'+mm+'-'+dd;
    const userIds = [];
    const postPurificationUserId = await DailyPurifications.find({date:date},{user_id:1,_id:0});
    postPurificationUserId.map((user) => userIds.push(user._id));
    const UserList =  await User.find( { "_id": { "$nin": userIds } } );
   if (postPurificationUserId.length !==0) {
    UserList.map(async (user) => {
        if (user.fcm_token!=null && user.fcm_token!=undefined) {
        Notifications.sendNotification("Daily Purification Reminder",user.fcm_token,"Please create Daily Purifications");
        const notifications = new NotificationsModel({
        title:"Heyyy",
        description:"You have not added purification for this date",
        userId:user._id
    });
    }
    await notifications.save();
    });
    return res.json("send....")
   }else{
    return res.json("no user....")
   }
    
   } catch (error) {
       console.log(error);
   }
}


exports.getNotificationList = async (req,res) => {
    try {
        const notifications = await NotificationsModel.find();
        return res.json(notifications)
    } catch (error) {
        console.log(error);
    }
}

exports.updateUserInfo = async (req,res) => {
    try {

        const userList = await User.find();
        userList.map(async(user)=>{
            const updatedUser =  await User.findOneAndUpdate(
                { '_id': user._id },
                { '$inc': {
                    readedData: user.readQuranData }
                }
              )
        })

     
    } catch (error) {
      return res.status(400).json(error);
    }
}

exports.updateReadDataTest = async (req,res) => {
    
try {
    const date = new Date();
console.log(date.getUTCFullYear());
console.log(date.getUTCMonth());
console.log(date.getUTCDate()); 
console.log(date.getUTCHours());
console.log(date.getUTCMinutes()); 
console.log(date.getUTCSeconds());
d = date.getUTCHours() + date.getUTCMinutes()+ date.getUTCSeconds()
} catch (error) {
    
}
  
}

const updateUserInfo22 = async (req,res) => {
    try {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
    
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
         today = dd +'/'+mm+'/'+yyyy;
       
        const date = new Date();

        const userList = await User.find({});
        userList.map(async(user)=>{
          
            if (user.time_zone !== null && user.time_zone !== undefined) {
                try {
                var TimeZone = user.time_zone;
                var minutes = Math.abs(Number(user.time_zone));
                var current_UTC_Time = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
                var checkTime =  calculate(current_UTC_Time,minutes,TimeZone.includes('-') ? true:false);
                if ((checkTime == '24:0')) {
                    console.log("AyatCheckTIme",checkTime,user._id);
    
                    await User.findOneAndUpdate(
                        { '_id': user._id },
                        { '$inc': {
                            readedData: user.readQuranData }
                        }
                      );
                      await User.findOneAndUpdate(
                        { '_id': user._id },
                        { $set: { quranUpdatedData:today} }
                      );  
                }
                } catch (error) {
                    console.log(error);
                }
                 
            }
           
        })
        console.log("userList");

    } catch (error) {
    return res.json(error);
    }
}

    // var task = cron.schedule('* * * * *', () => {
        var task = cron.schedule('*/30 * * * *', () => {
    updateUserInfo22();
  });
task.start();

const sendAlarmNotification = async (req,res) => {
    try {
        

        const userList = await User.find({});
        const date = new Date();
        userList.map((user)=>{
          if ((user.fcm_token!==null|| user.fcm_token!==undefined) && (user.time_zone !=null&& user.time_zone !=undefined)) {
            var TimeZone = user.time_zone;
            var minutes = Math.abs(Number(user.time_zone));
            var current_UTC_Time = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
           var checkTime =  calculate(current_UTC_Time,minutes,TimeZone.includes('-') ? true:false);
            if (checkTime == '23:57') {
                console.log(checkTime == '23:57',user._id,user.email);
                try {
                    
                    Notifications.sendNotification("Alarm",`${user.fcm_token}`,"Alarm Notification");
                } catch (error) {
                    console.log(error);
                }
            }
           
          }
        })
        console.log("senttt");

    } catch (error) {
     console.log(error);
    }
}


//todo notification


exports.todoNotification = async (req,res) => {
    try {
        

        const userList = await User.find({});
       
        const date = new Date();
        userList.map(async(user)=>{
          if ((user.fcm_token!==null|| user.fcm_token!==undefined) && (user.time_zone !=null&& user.time_zone !=undefined)) {
           
            var TimeZone = user.time_zone;
            var minutes = Math.abs(Number(user.time_zone));
            var current_UTC_Time = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
           var checkTime =  calculate(current_UTC_Time,minutes,TimeZone.includes('-') ? true:false);
            if (checkTime == '23:57') {
                console.log(checkTime == '23:57',user._id,user.email);
                try {
                    
          date.setDate(date.getDate()-1);
          console.log("here")
         const todos = await Todo.find({ user_id:user._id, date:date.toISOString().slice(0,10), status:false });
      
        if(todos.length>0){

        console.log(todos,"ffadfdfd")

                    Notifications.sendNotification("Alarm",`${user.fcm_token}`,"Pending Todo");
        }
                } catch (error) {
                    console.log(error);
                }
            }
           
          }
        })
        console.log("senttt");

    } catch (error) {
     console.log(error);
    }
}












var task2 = cron.schedule('57 * * * *', () => {
    sendAlarmNotification();
  });
task2.start();



