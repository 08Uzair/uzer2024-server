import { order } from "../models/orders.js";

// Add Order
export const addOrder = async (req, res) => {
  const { product, user, quantity, paymentInfo } = req.body;
  const saveData = new order({
    product,
    user,
    quantity,
    paymentInfo: { 
      ...paymentInfo,
      orderStatus: paymentInfo.orderStatus || "Processing",
      deliveredAt: paymentInfo.deliveredAt || { createdAt: new Date() },
    },
  });
  // console.log(saveData);

  try {
    await saveData.save();
    res.status(200).json({ message: "Order Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await order
      .find()
      .populate("product")
      .populate("user")
      .populate("status");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ORDER BY USERID

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await order
      .find({ user: userId })
      .populate("product")
      .populate("user")
      .sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order Not Found " });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    res.status(200).json({ message: "Order Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
