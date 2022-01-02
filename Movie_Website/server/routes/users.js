const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        console.log(`'${req.body.name}'님이 회원으로 가입되었습니다.`)
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {

        if (!user)
            return res.json({
                loginSuccess: false,
                message: "인증에 실패했습니다. 이메일을 찾을 수 없습니다."
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

            user.generateToken((err, user) => {
                console.log(`'${user._id}'님이 로그인을 성공하였습니다.`)
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.clearCookie("w_auth")
        res.clearCookie("w_authExp")
        console.log(`'${req.user._id}'님이 로그아웃을 성공하였습니다.`)
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/reset_user", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {

        if (!user)
            return res.json({
                success: false,
                message: "해당 이메일을 찾을 수 없습니다."
            })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.json({ success: false, err })

            if (req.body.password === req.body.newPassword) {
                return res.json({ success: false, message: "새로운 비밀번호가 기존 비밀번호와 같습니다." })
            }
            if (!isMatch)
                return res.json({ success: false, message: "기존 비밀번호를 확인해주세요." });

            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) return res.json({ success: false, message: err })

                bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                    if (err) return res.json({ success: false, message: err })
                    User.findOneAndUpdate({ email: req.body.email }, { password: hash }, (err, doc) => {
                        if (err) return res.json({ success: false, err })
                        return res.status(200).send({
                            success: true
                        })
                    })
                })
            })
        })
    })
})

module.exports = router;