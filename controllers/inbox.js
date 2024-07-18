import { inbox } from "../models/inbox.js";

// Add Message
export const addMessage = async (req, res) => {
  // console.log(req.body);
  // const author = req.userId;
  const { message, email, user } = req.body;
  const saveData = new inbox({
    message,
    email,
    user,
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Added Send Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

//Get Message
export const getMessage = async (req, res) => {
  try {
    const message = await inbox.find().sort({ createdAt: -1 }).populate("user");
    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Message by Id
export const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await inbox.findById(id);
    if (!messages) {
      return res.status(404).json({ message: "Message Not Found" });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Message
export const updateMessage = async (req, res) => {
  const { id } = req.params;
  // const author = req.userId;
  const { message, email } = req.body;
  try {
    const updatedata = {
      message,
    };
    const updatedMessage = await inbox.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message Not Found" });
    }
    res.status(200).json({
      updateMessage: updateMessage,
      message: "Message Updated Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Message
export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await inbox.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message Not Found" });
    }
    res.status(200).json({ message: "Message Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
