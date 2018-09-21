const { Property } = require("../models/Property");
const {Category} = require("../models/Category");
const {User} = require("../models/User");
const {validateComment, validateProperty} = require('../validation');

// @@ GET api/properties
// @@ desc GET all Properties
// @@ access Public
exports.getAllProperties = async(req, res) => {
  const properties = await Property.find({}).sort({date: -1});
  res.status(200).json(properties);
};

// @@ POST api/properties
// @@ desc POST Property
// @@ access Private
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
      user: req.user.id,
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

// @@ GET PUT/properties/:id
// @@ desc Get a Property
// @@ access Private
exports.updateProperty = async(req, res)=>{
  try{
    const property =  await Property.findById(req.params.id);
    if (property.user.toString() !== req.user.id) return res.status(401).json('Unauthorized');
    console.log('sup')

    await Property.findByIdAndUpdate(req.params.id, req.body);
    const updatedProperty = await Property.findById(req.params.id)

    res.status(200).json(updatedProperty);
  }
  catch(err){
    res.status(404).json('No post found');
  }
}

// @@ DELETE api/properties/:id
// @@ desc Get a Property
// @@ access Private
exports.deleteProperty = async(req, res)=>{
  try{
   const property =  await Property.findById(req.params.id);
   if (property.user.toString() !== req.user.id) return res.status(401).json('Unauthorized');
   const removedproperty = await property.remove();
   res.json({ success: true, removedproperty })
  }
  catch(err){
    res.status(500).json('Error')
  }
}

// @@ Get api/posts/like/:id
// @@ desc POST Likes/Unlikes to posts
// @@ access Private
exports.likeProperty = async(req, res) => {
  let isliked = {value: false};
  try{
   const property = await Property.findById(req.params.id);
   if(property.likes.filter(like => like.user.toString() === req.user.id).length > 0){
    // return res.status(400).json({ alreadyliked: 'User already likes this post' })  
    isliked.value = true;
   }
   if(isliked.value){
    const removeIndex = property.likes.map(like => like.user.toString()).indexOf(req.user.id);
    property.likes.splice(removeIndex, 1);
    const savedproperty = await property.save();
    return res.status(200).json(savedproperty);
   }
   property.likes.unshift({ user: req.user.id });
   const savedproperty = await property.save();
   res.status(200).json(savedproperty);
  }
  catch(err){
    res.status(404).json({ notfound: 'No such post found' })
  }
}

// @@ POST api/posts/comment/:id
// @@ desc POST comment to property
// @@ access Private
exports.commentProperty = async(req, res)=>{
  try{
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
  catch(err){
    res.status(500).json('Error');
  }
}

// @@ DELETE api/posts/comment/:id
// @@ desc DELETE comment to property
// @@ access Private
exports.deleteComment = async(req, res)=>{
  try{
    const property = await Property.findById(req.params.id);
    if (property.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({notfound: 'Comment not found'})
    }
    const commentToBeDeleted = property.comments.filter(comment =>comment._id.toString()===req.params.comment_id)
    
    if(commentToBeDeleted[0].user.toString() !== req.user.id){
      return res.status(400).json('Unauthorized');
    }

    const removeIndex = property.comments.map(comment =>comment._id.toString()).indexOf(req.params.comment_id);
    property.comments.splice(removeIndex, 1);
    const savedproperty = await property.save();
    res.status(200).json(savedproperty)
  }catch(err){
    res.status(404).json({notfound: 'No post found'})
  }        
}