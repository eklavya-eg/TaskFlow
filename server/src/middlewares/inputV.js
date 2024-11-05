const z = require("zod")


const priorityS = z.enum(['very high', 'high', 'med', 'low', 'very low'])
const statusS = z.enum(['initiated', 'in progress', "completed"])

function inPriority(req,res,next){
    const v = priorityS.safeParse(req.body.priority)
    if(!v.success){
        res.status(401).json({msg:"Invalid Input"})
    }
    next()
}

function inStatus(req,res,next){
    const v = statusS.safeParse(req.body.status)
    if(!v.success){
        res.status(401).json({msg:"Invalid Input"})
    }
    next()
}

module.exports={
    inPriority,
    inStatus
}