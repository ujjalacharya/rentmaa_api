module.exports = {

  getAllProperties(req, res){
    res.send('Showing all properties');
    
  },

  postProperty(req, res){
    const property= {};
    property.title = req.body.title,
    property.address = req.body.address,
    property.price = req.body.price,
    property.deposite = req.body.deposite

    res.status(200).json(property);
  }, 

}