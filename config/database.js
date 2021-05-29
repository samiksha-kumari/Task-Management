const mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/task-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
   })
    .then(() => {
        console.log("connected to db")
    })
    .catch(err => {
        console.log("error connecting to db", err)
    })

