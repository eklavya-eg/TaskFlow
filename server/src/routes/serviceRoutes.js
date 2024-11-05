const { Router } = require("express")
const router = Router()
const { Task, User } = require("../models/init")
const { tokenValidation } = require("../middlewares/auth")
const { inPriority, inStatus } = require("../middlewares/inputV")



router.get('/getAllUsers', tokenValidation, (req, res) => {
    const userName = req.user;
    User.find({}, "_id username").then((users) => {
        res.json({ users })
    }).catch((err) => {
        console.log(err)
        res.status(404).json({
            msg: err
        })
    })
})

router.put('/updatePriority', tokenValidation, inPriority, (req, res) => {
    const user = req.user
    const id = req.params.id
    const priority = req.body.priority
    Task.updateOne({
        username: user,
        _id: id,
    }, { priority: priority }).then((r) => {
        if (r.modifiedCount > 0) {
            return res.json({ msg: "success" })
        }
        else {
            return res.status(400).json({ msg: "failed" })
        }
    }).catch((err) => {
        console.log(err)
        return res.status(404).json({ err })
    })
})

router.put('/updateStatus', tokenValidation, inStatus, async (req, res) => {
    const user = req.user
    // const _id = req.body.userid
    const ids = req.body.ids
    const status = req.body.status
    try {
        const { _id } = await User.findOne({ username: user })
        const resu = await Task.updateMany({
            usersAssigned: _id,
            _id: { $in: ids },
        }, { status: status })
        if (resu.modifiedCount > 0) {
            return res.json({ msg: "success",
                modifiedCount: resu.modifiedCount,
                ids: ids
            })
        }
        else {
            return res.status(400).json({ msg: "failed"
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(404).json({ msg: err })
    }
})

router.post('/assign', tokenValidation, (req, res) => {
    const user = req.user
    const users = req.body.users
    const id = req.body.id
    Task.updateOne({
        _id: id,
        username: user,
    }, { $push: { usersAssigned: { $each: users } } }).then(r => {
        if (r.modifiedCount > 0) {
            return res.json(r)
        }
        return res.status(400).json({ msg: "no updates" })
    }).catch(er => {
        console.log(er)
        return res.status(400).json({ err: er })
    })
})

router.post('/unassign', tokenValidation, (req, res) => {
    const user = req.user
    const users = req.body.users
    const id = req.body.id
    Task.updateOne({
        _id: id,
        username: user,
    }, { $pull: { usersAssigned: { $in: users } } }).then(r => {
        if (r.modifiedCount > 0) {
            return res.json(r)
        }
        return res.json({ msg: "no updates" })
    }).catch(er => {
        console.log(er)
        return res.json({ err: er })
    })
})

module.exports = router