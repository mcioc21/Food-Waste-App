import express from 'express';
import {createUser, getUserById, getUsers, deleteUser, updateUser} from "../dataAccess/UserDA"
import userFilterDto from '../dataAccess/models/userFilterDto';

let userRouter = express.Router();
  
userRouter.route('/user').post( async (req, res) => {
  return res.json(await createUser(req.body));
})

userRouter.route('/user').get( async (req, res) => {  
  var queryParams = new userFilterDto(req.query) 
  return res.json(await getUsers(queryParams));
})

userRouter.route('/user/:id').get( async (req, res) => {
    let id = parseInt(req.params.id) 
    return res.json(await getUserById(id));
})

userRouter.route('/user/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteUser(id));
})

userRouter.route('/user/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateUser(req.body, id));
})

export default userRouter;