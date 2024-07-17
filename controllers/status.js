import { status } from "../models/status.js";


export const addStatus = async (req, res) => {
  const { name, color } = req.body;
  const saveData = new status({ name, color });
  try {
    await saveData.save();
    res.status(200).json({ message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

export const getStatus = async (req, res) => {
  try {
    const statuse = await status.find().sort({ createdAt: -1 });
    res.status(200).json(statuse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};
