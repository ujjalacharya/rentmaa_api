const { Property, validateProperty} = require("../models/Property");
const {Category} = require("../models/Category");

// @@ GET api/properties
// @@ desc GET all Properties
// @@ access Public
exports.getAllProperties = async(req, res) => {
  const properties = await Property.find({}).sort({date: -1});
  res.status(200).json(properties);
};

// @@ POST api/properties
// @@ desc POST Property
// @@ access Private - TODO
exports.postProperty = async(req, res) => {
  try{
    const {error} = validateProperty(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const category = await Category.findById(req.body.categoryId);
    if(!category) return res.status(400).send('No such category found')
  
    const property = new Property({
      title: req.body.title,
      address: req.body.address,
      price: req.body.price,
      status: req.body.status,
      description: req.body.description,
      category: {
        _id: category._id,
        name: category.name
      }
    })
  
    const savedproperty = await property.save();
  
    res.status(200).json(savedproperty);
  }
  catch(err){
    return res.status(500).json('Error');
  }
};

// @@ GET api/properties/:id
// @@ desc Get a Property
// @@ access Public
exports.getProperty = async(req, res) =>{
  try{
    const property = await Property.findById(req.params.id);
    if(!property) return res.status(404).json('No such property found');
  
    res.status(200).json(property);
  }
  catch(err){
    return res.status(500).json('Error');
  }
}

// @@ GET api/properties/:id
// @@ desc Get a Property
// @@ access Private - ToDO
exports.updateProperty = async(req, res)=>{
  try{
    await Property.findByIdAndUpdate(req.params.id, req.body);
    const updatedProperty = await Property.findById(req.params.id)
    res.status(200).json(updatedProperty);
  }
  catch(err){
    res.status(500).json('Error')
  }
}

// @@ DELETE api/properties/:id
// @@ desc Get a Property
// @@ access Private - TODO
exports.deleteProperty = async(req, res)=>{
  try{
    const deletedProperty = await Property.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedProperty);
  }
  catch(err){
    res.status(500).json('Error')
  }
}