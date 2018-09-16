const { Category, validateCategory } = require("../models/Category.js");

// @@ GET api/categories
// @@ desc GET all Categories
// @@ access Public
exports.getAllCategories = async(req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};
// @@ POST api/category
// @@ desc POST Category
// @@ access Private - TODO
exports.postCategory = async (req, res) => {

  const {error} = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
// @@ GET api/category/:id
// @@ desc Get a Category
// @@ access Public
exports.getCategory = async(req, res)=>{
  try{
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(400).json('No such category found');
  
    res.status(200).json(category);
  }
  catch(err){
    return res.status(500).json('Error')
  }
}
