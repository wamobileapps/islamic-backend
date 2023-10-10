const FamilyTreeNew = require("../models/FamilyTreeNew");
const jwt = require("jsonwebtoken");
exports.create = async (req, res) => {
  const { data } = req.body;
  const authorization = req.header('auth-token');
  
  if (!authorization) {
    return res.status(401).json({ message: "Authorization token not provided" });
  }

  try {
    const decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const userId = decoded._id;
console.log(userId)
    const existingData = await FamilyTreeNew.findOne({ userId });
    if (existingData) {
      existingData.data = data;
      const updatedData = await existingData.save();
      return res.status(200).json(updatedData);
    } else {
      const treeData = new FamilyTreeNew({
        userId: userId,
        data: data
      });

      const savedData = await treeData.save();
      return res.status(200).json(savedData);
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
};

exports.view = async (req, res) => {
  const authorization = req.header('auth-token');
  
  if (!authorization) {
    return res.status(401).json({ message: "Authorization token not provided" });
  }

  try {
    const decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const userId = decoded._id;
    const treeData = await FamilyTreeNew.findOne({ userId });
    if (!treeData) {
      return res.status(404).json({ message: "No Family Tree Data Found" });
    }
    return res.status(200).json({ data: treeData });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.update = async (req, res) => {
  const { data } = req.body;
  const authorization = req.header('auth-token');
  
  if (!authorization) {
    return res.status(401).json({ message: "Authorization token not provided" });
  }

  try {
    const decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const userId = decoded._id;

    const updatedData = await FamilyTreeNew.findOneAndUpdate({ userId }, { data }, { new: true });
    if (!updatedData) {
      return res.status(404).json({ message: "Family Tree Data not found" });
    }
    return res.status(200).json({ data: updatedData, msg: "Family Tree Data updated successfully" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  const { userId } = req.params;
  const authorization = req.header('auth-token');
  
  if (!authorization) {
    return res.status(401).json({ message: "Authorization token not provided" });
  }

  try {
    const decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const userId = decoded._id;

    const deletedData = await FamilyTreeNew.findOneAndRemove({ userId });
    if (!deletedData) {
      return res.status(404).json({ message: "Family Tree Data not found" });
    }
    return res.status(200).json({ message: "Family Tree Data deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete Family Tree Data" });
  }
};
