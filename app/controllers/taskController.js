const Task = require('../models/task')

const taskController = {}

//listing task
taskController.list = (req, res) => {
   
    if(req.user.role.name.toLowerCase() === 'manager'){
    Task.find({}).populate('userId')
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.json(err)
        })}else{
            Task.find({userId:req.user._id}).populate('userId')
            .then(tasks => {
                res.json(tasks)
            })
            .catch(err => {
                res.json(err)
            })  
        }
}

//create task
taskController.create =async  (req, res) => {
    const body = req.body
    if(req.user.role.name.toLowerCase() === 'manager'){
        const userIds = req.body.userIds
        const promiseArray = userIds.map(c => {
            return  Task.create({
                name:body.name, isCompleted: false, userId: c
            })         
        })
     const data= await Promise.all(promiseArray)
     res.json(data)   
     }else{
    const task = new Task({
        name:body.name, isCompleted: false, userId: req.user._id
    })
    task.save()
        .then(task => {
            res.json([task])
        })
        .catch(err => {
            res.json(err)
        })}
}

//view task
taskController.show = (req, res) => {
    const id = req.params.id
    Task.findOne({_id: id})
        .then(task => {
            res.json(task)
        })
        .catch(err => {
            res.json(err)
        })
}

//update task
taskController.update = (req, res) => {
    const id = req.params.id
    Task.findOneAndUpdate({_id: id}, req.body, {new: true}).populate('userId')
        .then(task => {
            res.json(task)
        })
        .catch(err => {
            res.json(err)
        })
}

//delete task
taskController.destroy = (req, res) => {
    const id = req.params.id
    Task.findOneAndDelete({_id: id})
        .then(task => {
            res.json(task)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = taskController