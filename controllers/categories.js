const { Category} = require("../models/Category.js");
const {validateCategory} = require('../validation')

// @@ GET api/categories
// @@ desc GET all Categories
// @@ access Public
exports.getAllCategories = async(req, res) => {
  console.log(req.user)
  const categories = await Category.find({});
  res.status(200).json(categories);
};

// @@ POST api/categories
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

// @@ GET api/categories/:id
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

// @@ PUT api/categories/:id
// @@ desc Update a Category
// @@ access Prive -TODO
exports.updateCategory = async(req, res)=>{
  try{
    await Category.findByIdAndUpdate(req.params.id, req.body);
    const updatedCategory = Category.findById(req.params.id);
    res.status(200).json(updatedCategory)
  }
  catch(err){
    res.status(500).json('Error')
  }
}

// @@ DELETE api/categories/:id
// @@ desc Get a Category
// @@ access Private - TODO
exports.deleteCategory= async(req, res)=>{
  try{
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedCategory);
  }
  catch(err){
    res.status(500).json('Error')
  }
}