const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

//GET ALL TODO ITEMS
router.get('/', async (req, res) => {
  try {
    //finding and querry all the data from the database 
    const todos = await Todo.find();
    //passing it as json response
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


//POST TO-DO ITEM 
router.post('/', async (req, res) => {
  //destructured task from '../models/Todo'
  const { task } = req.body;
  try {
    //passing task values to created schema for that created new Todo 
    const newTodo = new Todo({
      task,
    });
    //saving the new Todo in the DB
    const savedTodo = await newTodo.save();
    //passing it as response
    res.json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


//DELETE TO-DO ITEM
router.delete('/:id', async (req, res) => {
  try {
    //tking the params id
    const id = req.params.id
    //need to await untill the promise need to get resolved or rejected 
    const deleteTodo = await Todo.findByIdAndDelete(id)
    //sendng the response
    res.status(204).json({
      status: "no content",
      //nothing in data means null
      data: null
    })
  } catch (error) {
    const id = req.params.id
    res.status(400).json({
      status: "failed",
      message: `task with id ${id} not find`
    })
  }
})

//UPDATE TO-DO ITEM
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    //need to await untill the promise need to get resolved or rejected 
    const updateTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    res.status(200).json({
      status: "success",
      data: {
        Todo: updateTodo
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "failed"
    })
  }

})



module.exports = router;