const { Category } = require("../models/Category.js");

exports.getAllCategories = (req, res) => {
  res.send("Showing all categories");
};

exports.postCategory = async (req, res) => {

  try {
    const category = new Category({
      name: req.body.name
    });
    const savedCategory = await category.save();
    return res.status(200).json(savedCategory);
  }

  catch (err) {
    return res.status(500).json("Error");
  }

};
