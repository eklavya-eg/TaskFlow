const { Router } = require("express");
const router = Router();
const { Task, User } = require('../models/init');
const { inPriority, inStatus } = require("../middlewares/inputV")
const { tokenValidation } = require("../middlewares/auth")


router.get('/', tokenValidation, async (req, res) => {
    try {
        const {_id} = await User.findOne({ username: req.user })
        Task.find({ usersAssigned: _id}).then(tasks => {
            return res.json({
                tasks
            });
        })
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err)
        return
    }
});
router.get('/:id', tokenValidation, (req, res) => {
    const id = req.params.id;
    Task.findById(id).then((r) => {
        if (r && r.userName == req.user) {
            return res.json({ task: r });
        }
        else {
            return res.status(400).json({
                msg: "Not Found"
            })
        }
    }).catch((err) => {
        console.log(err)
        return res.status(404).json({
            err,
        })
    })
});
router.post('/add', tokenValidation, (req, res) => {
    const today = getDateMonth()
    Task.create({
        task: req.body.task,
        description: req.body.des,
        priority: req.body.priority,
        status: "initiated",
        username: req.user,
        usersAssigned: [req.body.id],
        date: today[0],
        month: today[1]
    }).then((r) => {
        return res.json(r)
    }).catch((err) => {
        console.log(err)
        return res.status(404).json({ msg: err })
    })
});

module.exports = router;

function getDateMonth() {
    var today = new Date()
    today = today.toString().split(' ')
    return [today[2], today[1]]
}