const { Property } = require("../models/Property");
const {Category} = require("../models/Category");
const {User} = require("../models/User");
const {validateComment, validateProperty} = require('../validation');

// @@ GET api/properties
// @@ desc GET all Properties
// @@ access Public
exports.getAllProperties = async(req, res) => {
  const perPage = 10;
  const page = req.query.page || 1;   
  const properties = await Property.find({approved: true})
  .sort({date: -1})
  .skip((perPage * page) - perPage)
  .limit(perPage);
  res.status(200).json(properties);
};

// @@ GET api/unapprovedporoperties
// @@ desc GET all Unapproved Properties
// @@ access Private- Admin
exports.getAllUnapprovedProperties = async(req, res) => {
  const perPage = 10;
  const page = req.query.page || 1;  
  const unapprovedproperties = await Property.find({approved: false})
  .sort({date: -1})
  .skip((perPage * page) - perPage)
  .limit(perPage);
  res.status(200).json(unapprovedproperties);
};

// @@ POST api/properties
// @@ desc POST Property
// @@ access Private
exports.postProperty = async(req, res) => {
  const {error} = validateProperty(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if(!category) return res.status(400).send('No such category found');

  let image = [];

  //Setting image
  if(req.files !== undefined){
    req.files.map((file, i)=>{
      image[i] = 'properties/'+file.filename;
    })
    }else{
    image = 'properties/default.jpg';
    }

  const property = new Property({
    title: req.body.title,
    address: req.body.address,
    price: req.body.price,
    status: req.body.status,
    description: req.body.description,
    user: req.user.id,
    category: {
      _id: category._id,
      name: category.name
    }
  })
  property.images.unshift(image)  
  const savedproperty = await property.save();

  res.status(200).json(savedproperty);
};

// @@ GET api/properties/:id
// @@ desc Get a Property
// @@ access Public
exports.getProperty = async(req, res) =>{
  const property = await Property.findById(req.params.id);
  if(!property) return res.status(404).json('No such property found');
  if(!property.approved) return res.status(401).json('Cannot access this property')
  property.numberOfViews +=1;
  await property.save();
  res.status(200).json(property);
}

// @@ GET PUT/properties/:id
// @@ desc Get a Property
// @@ access Private
exports.updateProperty = async(req, res)=>{
  const property =  await Property.findById(req.params.id);
  if (property.user.toString() !== req.user.id) return res.status(401).json('Unauthorized');

  await Property.findByIdAndUpdate(req.params.id, req.body);
  const updatedProperty = await Property.findById(req.params.id)

  res.status(200).json(updatedProperty);
}

// @@ DELETE api/properties/:id
// @@ desc Get a Property
// @@ access Private
exports.deleteProperty = async(req, res)=>{
  const property =  await Property.findById(req.params.id);
  if (property.user.toString() !== req.user.id && !req.user.isAdmin) return res.status(401).json('Unauthorized')
  const removedproperty = await property.remove();
  
  res.json({ success: true, removedproperty })
}

// @@ Get api/posts/like/:id
// @@ desc POST Likes/Unlikes to posts
// @@ access Private
exports.likeProperty = async(req, res) => {
  let isliked = false;
  const property = await Property.findById(req.params.id);
  if(property.likes.filter(like => like.user.toString() === req.user.id).length > 0){
  // return res.status(400).json({ alreadyliked: 'User already likes this post' })  
  isliked = true;
  }
  if(isliked){
  const removeIndex = property.likes.map(like => like.user.toString()).indexOf(req.user.id);
  property.likes.splice(removeIndex, 1);
  const savedproperty = await property.save();
  return res.status(200).json(savedproperty);
  }
  property.likes.unshift({ user: req.user.id });
  const savedproperty = await property.save();
  res.status(200).json(savedproperty);
}

// @@ POST api/posts/comment/:id
// @@ desc POST comment to property
// @@ access Private
exports.commentProperty = async(req, res)=>{
  const {error} = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const property = await Property.findById(req.params.id);
  const user = await User.findById(req.user.id);
  
  const newcomment = {
    user: req.user.id,
    name: user.name,
    text: req.body.text
  };
  property.comments.unshift(newcomment);
  const savedproperty = await property.save();
  res.status(200).json(savedproperty);
}

// @@ DELETE api/posts/comment/:id
// @@ desc DELETE comment to property
// @@ access Private
exports.deleteComment = async(req, res)=>{
  const property = await Property.findById(req.params.id);
  if (property.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
    return res.status(404).json({notfound: 'Comment not found'})
  }
  const commentToBeDeleted = property.comments.filter(comment =>comment._id.toString()===req.params.comment_id)
  
  if(commentToBeDeleted[0].user.toString() !== req.user.id && !req.user.isAdmin){
    return res.status(400).json('Unauthorized');
  }

  const removeIndex = property.comments.map(comment =>comment._id.toString()).indexOf(req.params.comment_id);
  property.comments.splice(removeIndex, 1);
  const savedproperty = await property.save();
  res.status(200).json(savedproperty)       
}

// @@ GET api/properties/query
// @@ desc GET property by location query
// @@ access Public
exports.queryProperty = async(req, res)=>{
  const query = req.query.location;
  let result = await Property.find({address: {'$regex': query, '$options': 'i'}});
  if(!result) throw new Error();
  res.status(200).json(result) //Result is in array
}

// @@ PUT api/change-state-property/:id
// @@ desc PUT property approved state
// @@ access Private-Admin
exports.changePropertyState = async(req, res)=>{
  const property = await Property.findById(req.params.id);
  if(!property) return res.status(404).json('No such property found');
  property.approved = !property.approved;
  await property.save();
  res.status(200).json(property);
}