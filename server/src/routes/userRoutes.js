const { tokenValidation } = require("../middlewares/auth");
const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/init');
const { jwtPass } = require('../config')


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const token = await jwt.sign({ username: username }, jwtPass);
                return res.json({
                    userid: user._id,
                    token: token
                });
            } else {
                return res.status(400).json({ msg: 'wrong credentials' });
            }
        } else {
            return res.status(400).json({ msg: 'user not exists' });
        }
    } catch (err) {
        return res.status(404).json({ msg: err.message });
    }
});


router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (user) {
            return res.status(400).json({ msg: 'User already exists!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const savedUser = await User.create({
            name: name,
            username: username,
            password: hash,
            salt: salt
        })

        const token = await jwt.sign({ "username": username }, jwtPass)

        return res.json({
            "userid": savedUser._id,
            "token": token
        });



    } catch (err) {
        console.log(err)
        return res.status(404).json({ msg: 'Server error', error: err.message });
    }
});



module.exports = router;