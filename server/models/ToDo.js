const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name:{type:String, requiered: true, trim:true},
    done:{type:Boolean, default:false},
    description:{type:String, requiered: true, trim:true}
})

const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo;