const db = require('../models/index');
const { options } = require('../routes');
const Users = db.Users
//const twilio =require('./twilio')

exports.getUsers = async (req, res)=>{
  try {
    const users = await Users.findAll();
    if(users === null){
      return res.status(400).json({msg: "to user found"});
    }else{
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

exports.getUsersByID = (req, res)=>{
    const id = parseInt(req.params.id)
    Users.findByPk(id)
    .then((result) => {
      if(result !== null){
        return res.status(200).json(result)
      }else{
        return res.status(200).json({result: "No User found"})
      }
    }).catch((err) => {
      return res.status(400).json(err)
    });
}
exports.getUserByName =async (req, res)=>{
  try {
    const firstname = req.body.firstname 
    const lastname = req.body.lastname
    const result = await Users.findAll({
      attributes:[firstname, lastname]
    })
    if(result !== null){
      return res.status(200).json(result)
    }else{
      return res.status(200).json({msg: "no result found"})
    }
    
  } catch (error) {
    return res.status(400).json(error)
  }
}
exports.createUser = async(req, res) => {
  /*
  const user={
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    homeAddress: req.body.homeAddress,
    phoneNo: req.body.phoneNo,
    dob: req.body.dob,
    email: req.body.email
  }
  */
 const {userId, firstname, middlename, lastname, homeAddress, phoneNo, dob, email, bvn} = req.body 
 
  // validate request
  if(req.body=== null){
    return res.status(400).json({message: "Content cannot be empty"})
  }else{
     const user ={userId, firstname, middlename, lastname, homeAddress, phoneNo, dob, email, bvn}
    //create user object
    Users.create(user)
    .then((result) => {
      return res.status(200).json(result)
    }).catch((err) => {
      return res.status(400).json(err)
    });
  }
}

exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  Users.update(req.body, {where:{id: id}})   
  .then((result) => {
    if(result===1){
      return res.status(200).json({status: "Update successful"})
    }else{
      return res.status(200).json({status: `Cannot update user with ID ${id}`})
    }
  }).catch((err) => {
    return res.status(400).json(err)
  });
}

exports.deleteAllUser =(req, res)=>{
  Users.destroy({
    truncate: true
  })
  .then((result) => {
    return res.status(200).json({status: `User table deleted successfully`})
  }).catch((err) => {
    return res.status(400).json(err)
  });

}

exports.deleteUserByID = (req, res) => {
  const id = req.params.id
  //first find, then delete
  Users.destroy(id)
  .then((result) => {
    if(result===1){
      return res.status(200).json({status: `user with ID ${id} deleted successfully`})
    }else{
      return res.status(200).json({status: `Cannot delete user with ID ${id}`})
    }
  }).catch((err) => {
    return res.status(400).json(err)
  });
}

