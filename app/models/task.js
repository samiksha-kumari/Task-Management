const mongoose = require('mongoose');

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    userId:{
       type: Schema.Types.ObjectId,
       ref:'User',
       required:true
    }
},{
    timestamps:true
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;