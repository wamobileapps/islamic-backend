const express = require('express');
const QuranData = require("../models/QuranData");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const exp = require('constants');


exports.create = async (req,res) => {
    var authorization = req.header('auth-token');
 
    if (authorization) {
      var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
      var userId = decoded._id;
    try {
      // await QuranData.remove();
      const existData=  await QuranData.findOne({"userId":userId,"quranData.page":req.body.quranData.page});
      if (existData==null) {
        const storeQuranData = new QuranData({
          userId:userId,
          quranData:req.body.quranData,

      })
      const saveData = await storeQuranData.save();
      res.status(200).json({msg:"Quran Data Stored",data:saveData})
      }
      else{
        const purification =  await QuranData.findByIdAndUpdate(existData._id, req.body, { new: true });
        return res.json({data:purification,msg:"QuranData updated successfully"});
      }
      

    } catch (error) {

          return res.status(400).json(error);
        
    }
}

}

exports.getData = async (req,res) => {
    var authorization = req.header('auth-token');

    if (authorization) {
        var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
        var userId = decoded._id;
      try {
    const quranData = await QuranData.find({"userId":userId,"quranData.page":req.params.pageId});
    res.status(200).json({data:quranData})
   } catch (error) {
    return res.status(400).json(error);
   }
}
}


exports.updateUserData = async (req,res) => {
  var authorization = req.header('auth-token');

  if (authorization) {
      var decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
      var userId = decoded._id;
    try {
      if (req.body.readQuranData === 0) {
        await User.updateOne(
          { _id: userId },
          { $set: { readQuranData: 0,readedData:0,quranUpdatedData:req.body.today_date,readedData:0,current_value:0} }
        );
        return res.json(`data updated...only dateee`)
      }
      var CheckTodayUpdated = await User.findOne({_id:userId});
      if (CheckTodayUpdated!=null || CheckTodayUpdated!= undefined) {

          var {current_value,quranUpdatedData,readedData,readQuranData} = CheckTodayUpdated;
          console.log(req.body.today_date,quranUpdatedData, req.body.today_date == quranUpdatedData);
          if (quranUpdatedData == req.body.today_date) {
            readQuranData = readQuranData > req.body.readQuranData ? readQuranData-req.body.readQuranData: current_value-req.body.readQuranData
            readedData = Math.abs(readedData - readQuranData);
            await User.updateOne(
              { _id: userId },
              { $set: { readQuranData: req.body.readQuranData,current_value:req.body.readQuranData,readedData:readedData} }
            );
            return res.json(`data updated...only date${readQuranData}`)
          }
          if (current_value == req.body.current_value && quranUpdatedData == req.body.today_date ) {
            return res.json('data updated...1')
          }else{
            readQuranData = readQuranData > req.body.readQuranData ? readQuranData-req.body.readQuranData: current_value-req.body.readQuranData
            readedData = readedData - readQuranData;
            await User.updateOne(
              { _id: userId },
              { $set: { readQuranData: req.body.readQuranData,current_value:req.body.readQuranData,readedData:readedData+current_value,quranUpdatedData:req.body.today_date} }
              // { $set: { readQuranData: req.body.readQuranData,readedData:Math.abs(req.body.current_value > current_value ? req.body.current_value - current_value: current_value - req.body.current_value)} }
            );
            return res.json(`data updated... else${readedData+current_value}`)
          }

      }
      else{
        await User.updateOne(
          { _id: userId },
          { $set: { readQuranData: req.body.readQuranData,readedData:req.body.current_value,quranUpdatedData:req.body.today_date,readedData:req.body.readQuranData} }
        );
        return res.json('data updated...last else')
      }
     
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
}