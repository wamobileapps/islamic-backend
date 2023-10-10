const UserInfo = require("../models/UserInfo")
const UserInfoForMajor = require("../models/UserInfoForMajor")



const myLifePlan = {
    info: [{
        name: "At birth you don’t really have an income",
        y: "",
        x: 0
    },
    {
        name: "Income at the age of 10",
        y: "",
        x: 10,
        des: "you have regular pocket money and some savings."
    },
    {
        name: "Income at the age of 16",
        y: "",
        x: 16,
        des: "most people get their first part time job"
    },
    {
        name: "Income at the age of 18",
        y: "",
        x: 18,
        des: "usually get the first proper summer job"
    },
    {
        name: "Income at the age of 21",
        y: "",
        x: 21,
        des: "most people graduate and start their careers"
    },
    {
        name: "Income at the age of 25",
        y: "",
        x: 25,
        des: "established career and had a few promotions"
    },
    {
        name: "Income at the age of 28",
        y: "",
        x: 28,
        des: "Now in management"
    },
    {
        name: "Income at the age of 35",
        y: "",
        x: 35,
        des: ""
    },
    {
        name: "Income at the age of 40",
        y: "",
        x: 40,
        des: ""
    },
    {
        name: "Income at the age of 50",
        y: "",
        x: 50,
        des: ""
    },
    {
        name: "Income at the age of 60",
        y: "",
        x: 60,
        des: ""
    },
    {
        name: "Income at the age of 65",
        y: "",
        x: 65,
        des: ""
    },
    {
        name: "The average person retires at 65. Their income drops by 50% ",
        y: "",
        x: 70
    }
    ],
    user: ""
}

//  Major Evnts
const myLifePlanForMajor = {
    info: [{
        name: "First Car",
        y: 0,
        x: 0,
        amount:0,
        value:"First Car"
    },
    {
        name: "First major holiday",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"First major holiday"
        
    },
    {
        name: "First Proper Car",
        y: 0,
        x: 0,
        des:"",
        amount:0,
        value:"First Proper Car"
        
    },
    {
        name: "Marriage",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"Marriage"
    },
    {
        name: "House",
        y: 0,
        x: 0,
        des:  "",
        amount:0,
        value:"House"
    },
    {
        name: "At what age will you have children? ",
        y: 0,
        x: 0,
        des:  "",
        amount:0,
        value:"Children"
    },
    {
        name: "Bigger House ",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"Bigger House "
    },
    {
        name: "Family Car ",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"Family Car "
    },
    {
        name: "Children’s Education ",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"Children’s Education "
    },
    {
        name: "Children’s Weddings",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"Children’s Weddings"
    },
    {
        name: "Retirement",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"Retirement"
    },
    {
        name: "Business",
        y: 0,
        x: 0,
        des:  "",
        amount:0,
        value:"Business"
    },
    {
        name: "Hajj",
        y: 0,
        x: 0,
        des: "",
        amount:0,
        value:"Hajj"
    },
    {
        name: "Travel (world)",
        y: 0,
        x: 0,
        des:  "",
        amount:0,
        value:"Travel (world)"
    },
    {
        name: "Other ambitions",
        y: 0,
        x: 0,
        des:  "",
        amount:0,
        value:"Other ambitions"
    },
    ],
    user: ""
}


exports.getUserInfo = async (req, res) => {
    const userId = req.params.userId
    try {
        myLifePlan.user = userId;


        const checkData = await UserInfo.findOne({
            user: userId
        })
        console.log("hjgsdudg", checkData)

        if (checkData == null) {
            return res.status(200).json({ status: true, data: myLifePlan })
        } else {
            return res.status(200).json({
                data: checkData,
                status: true
            })
        }



    } catch (error) {
        return res.status(500).json(error)
    }
}

//  Major Events
exports.getUserInfoForMajor = async (req, res) => {
    const userId = req.params.userId
    try {
        myLifePlanForMajor.user = userId;


        const checkData = await UserInfoForMajor.findOne({
            user: userId
        })
        console.log("hjgsdudg", checkData)

        if (checkData == null) {
            return res.status(200).json({ status: true, data: myLifePlanForMajor })
        } else {
            return res.status(200).json({
                data: checkData,
                status: true
            })
        }



    } catch (error) {
        return res.status(500).json(error)
    }
}

//  major events

exports.addUserInfoForMajor = async (req, res) => {
    const userId = req.params.userId
    try {
        const checkdata = await UserInfoForMajor.findOne({
            user: userId
        })
        console.log(checkdata)
        if (checkdata == null) {
            myLifePlanForMajor.user = userId;
            const replaceData = new UserInfoForMajor(myLifePlanForMajor)
            const saveData = await replaceData.save();
            return res.status(200).json({
                status: true,
                data: saveData
            })
        } else {

            const replaceData = await UserInfoForMajor.updateMany({ user: userId }, req.body);
            const updatedData = await UserInfoForMajor.findOne({
                user: userId
            })
            return res.status(200).json({
                status: true,
                data: updatedData
            })
        }






    } catch (error) {
        return res.status(500).json(error)

    }
}
//  major events
exports.deleteAllForMajor =async (req,res)=>{
try {
    const dellteAllData = await UserInfoForMajor.deleteMany()
    res.json({delete:true})
} catch (error) {
    console.log(error);
}

}

exports.deleteUserInfo =async(req,res)=>{
    const id= req.params.id
    try {
        const deleteInfo = await UserInfo.findOneAndDelete({user:id})
        res.json({msg:"deleted"})
    } catch (error) {
        console.log(error);
    }
}
exports.deleteUserInfoForMajor =async(req,res)=>{
    const id= req.params.id
    try {
        const deleteInfo = await UserInfoForMajor.findOneAndDelete({user:id})
        res.json({msg:"deleted"})
    } catch (error) {
        console.log(error);
    }
}
exports.addUserInfo = async (req, res) => {
    const userId = req.params.userId
    
    try {
        const checkdata = await UserInfo.findOne({
            user: userId
        })
      
        console.log(checkdata)
        if (checkdata == null) {
            myLifePlan.user = userId;
            const replaceData = new UserInfo(myLifePlan)

            console.log("hello *************************");
            if(req.body.isValid==true){
             let getdata =   myLifePlan.info.filter((item) => item.x == 65 && item.y != "");
             console.log(getdata,"getdata")
             if(getdata.length != 0){
                 let data =[
                    {
                        name: "The average person retires at 65. Their income drops by 50%",
                        y: getdata.y/2,
                        x: 70,
                        des: ""
                    },
                    {
                        name: "",
                        y: getdata.y/2,
                        x: 80,
                        des: ""
                    },
                    {
                        name: "",
                        y: getdata.y/2,
                        x:  90,
                        des: ""
                    },

                 ];
                myLifePlan.info.push(...data)
                console.log(myLifePlan,"myLifePlan")
             }
            }
            const saveData = await replaceData.save();
            return res.status(200).json({
                status: true,
                data: saveData
            })
        } else {

            const replaceData = await UserInfo.updateMany({ user: userId }, req.body);
            const updatedData = await UserInfo.findOne({
                user: userId
            })
            return res.status(200).json({
                status: true,
                data: updatedData
            })
        }






    } catch (error) {
        return res.status(500).json(error)

    }
}

exports.deleteAll =async (req,res)=>{
try {
    const dellteAllData = await UserInfo.deleteMany()
    res.json({delete:true})
} catch (error) {
    console.log(error);
}

}