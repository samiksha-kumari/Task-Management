const Task = require('../models/task')

const taskController = {}

taskController.list = (req, res) => {
    console.log(req.user, 'use')
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

taskController.create =async  (req, res) => {
    const body = req.body
    if(req.user.role.name.toLowerCase()==='manager'){
        const userIds = req.body.userIds
        const promiseArray = userIds.map(c=>{
            return  Task.create({name:body.name, isCompleted: false, userId: c})         
        })
       const data= await Promise.all(promiseArray)
res.json(data)    }else{
    const task = new Task({name:body.name, isCompleted: false, userId: req.user._id})
    task.save()
        .then(task => {
            res.json([task])
        })
        .catch(err => {
            res.json(err)
        })}
}

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


taskController.update = (req, res) => {
    const id = req.params.id
    Task.findOneAndUpdate({_id: id}, req.body, {new: true}).populate('userId')
        .then(task => {
            console.log(task, 'taskname')
            res.json(task)
        })
        .catch(err => {
            res.json(err)
        })
}
taskController.destroy = (req, res) => {
    const id = req.params.id
    Task.findOneAndDelete({_id: id})
        .then(task => {
            console.log(task, 'taskname')
            res.json(task)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = taskController