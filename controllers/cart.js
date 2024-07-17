import { cart } from "../models/cart.js";

export const addCartProduct = async (req, res) => {
  const { product, user } = req.body;
  const saveData = new cart({
    product,
    user,
    createdAt: new Date().toISOString(),
  });
  try {
    await saveData.save();
    res.status(200).json({ message: "Product Added Successfully to Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Get Cart Products
export const getCartProducts = async (req, res) => {
  try {
    const cartProducts = await cart
      .find()
      .populate("product")
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json({ cartProducts });
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart products" });
  }
};

// Get Cart Product by Id
export const getCartProductByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartProduct = await cart
      .find({ user: userId })
      .populate("product")
      .populate("user")
      .sort({ createdAt: -1 });
    if (!cartProduct) {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }
    res.status(200).json(cartProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Cart Product by User Id
export const deleteCartProductByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log("yes");
  try {
    const cartProducts = await cart.find({ user: userId });
    if (cartProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in cart for this user" });
    }

    // More efficient deletion of all products for the user
    await cart.deleteMany({ user: userId });

    res
      .status(200)
      .json({ message: "Products deleted successfully from cart" });
  } catch (error) {
    res;
    console
      .log(error)

      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update Cart Product
export const updateCartProduct = async (req, res) => {
  const { id } = req.params;
  const { product, user } = req.body;
  console.log(product);
  console.log(user);
  const updatedata = { product, user };
  console.log(updatedata);
  try {
    const updatedCartProduct = await cart
      .findByIdAndUpdate(id, updatedata, {
        new: true,
      })
      .populate("product")
      .populate("user");

    if (!updatedCartProduct) {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }
    res.status(200).json({
      updatedCartProduct,
      message: "Product Updated Successfully in Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Cart Product
export const deleteCartProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCartProduct = await cart.findByIdAndDelete(id);
    if (!deletedCartProduct) {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }
    res.status(200).json({ message: "Product Deleted Successfully from Cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
