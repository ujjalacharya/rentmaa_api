const { Property, validateProperty} = require("../models/Property");
const {Category} = require("../models/Category");

//Show all properties
exports.getAllProperties = async(req, res) => {
  const properties = await Property.find({});
  res.status(200).json(properties);
};

// @@ POST api/properties
// @@ desc POST Property
// @@ access Private - TODO
exports.postProperty = async(req, res) => {
  try{
    const {error} = validateProperty(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const category =await Category.findById(req.body.categoryId);
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

// @@ GET api/property/:id
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