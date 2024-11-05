const mongoose = require("mongoose")
const { TaskSchema } = require("./task")
const { UserSchema } = require("./user")


const CONNECTION_STRING = "mongodb+srv://eklavya:cnMmBVvs5nQaJ4UU@cluster0.rt4zx.mongodb.net/taskmanager"
mongoose.connect(CONNECTION_STRING).then(()=>{
    console.log("MongoDB Connected")
}).catch((err)=>{
    console.log(err)
})

const Task = mongoose.model("Task", TaskSchema)
const User = mongoose.model("User", UserSchema)

module.exports = {
    Task,
    User
}