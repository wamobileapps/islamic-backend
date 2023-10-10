const DailyAdkhar = require("../models/DailyAdkhar")
const jwt = require("jsonwebtoken");


exports.create = async (req, res) => {
    try {

        const authorization = req.header("auth-token")
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user_id = decode._id

        const check = await DailyAdkhar.findOne({ "user": user_id })

        if (check != null) {
            const updateValues = await DailyAdkhar.updateOne({ "user": user_id }, req.body)
            res.status(201).json({ status: true, msg: "Values updated", })
        } else {
            const entry = {
                user: user_id,
                value1: req.body.value1,
                value2: req.body.value2,
                value3: req.body.value3,
                value4: req.body.value4,
                number: req.body.number,

            }
            try {
                const createData = new DailyAdkhar(entry)
                const saveData = await createData.save()
                res.status(200).json({ status: true, msg: "Values Added", data: saveData })

            } catch (error) {
                res.status(500).json({ error })

            }
        }




    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.getDailyData = async (req, res) => {
    try {
        const authorization = req.header("auth-token")
        const decode = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user_id = decode._id
        const getDailyData = await DailyAdkhar.findOne({ "user": user_id })
        res.json({ status: true, data: getDailyData })

console.log(decode);
    } catch (error) {
        res.json({ error })
    }
}