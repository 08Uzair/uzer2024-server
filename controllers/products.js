import { product } from "../models/products.js";

// Add Product
export const addProduct = async (req, res) => {
  // console.log(req.body);
  // const author = req.userId;
  const {
    name,
    description,
    stocks,
    price,
    color,
    size,
    discount,
    rank,
    image,
    category,
  } = req.body;
  const saveData = new product({
    name,
    description,
    stocks,
    price,
    color,
    size,
    discount,
    rank,
    image,
    category,
    createdAt: new Date().toISOString(),
  });
  console.log(saveData);

  try {
    await saveData.save();
    res.status(200).json({ message: "Added Sucessfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

//Get Product
export const getProducts = async (req, res) => {
  try {
    const products = await product
      .find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

// Get Product by Id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await product.findById(id);
    if (!products) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  // const author = req.userId;
  const {
    name,
    description,
    stocks,
    price,
    color,
    size,
    discount,
    rank,
    image,
    category,
    createdAt,
  } = req.body;
  try {
    const updatedata = {
      name,
      description,
      stocks,
      price,
      color,
      size,
      discount,
      rank,
      image,
      category,
      createdAt,
    };
    const updatedProduct = await product.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res
      .status(200)
      .json({ updateMember: updateProduct, message: "Added Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search Product
export const searchProduct = async (req, res) => {
  const searchTerm = req.query.q; // Assuming 'q' as the search parameter
  try {
    const results = await blogPost.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for name
        { description: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for description
        { color: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for color
        { price: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for price
        { category: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for price
      ],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter Product
