const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblUser } = require("../models");

const Op = Sequelize.Op;

const getAllTblUser = async (req, res) => {
    const tblUserData = await tblUser.findAll({
        order: [["user_id", "ASC"]],
    });

    return res.json(tblUserData);
};

const getTblUserId = async (req, res) => {
    const { user_id } = req.body;

    const tblUserID = await tblUser.findOne({
        attributes: ["user_id"],
        where: { user_id: user_id },
    });

    return res.json(tblUserID);
};

const postTblUser = async (req, res) => {
    const {
        user_id,
        usertype_id,
        username,
        password,
        firstname,
        lastname,
        initial,
    } = req.body;

    await tblUser.create({
        user_id: user_id,
        usertype_id: usertype_id,
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        initial: initial,
    });

    return res.json("SUCCESS");
};

router.get("/getAllTblUser", validateUser, validate, getAllTblUser);
router.post("/getTblUserId", validateUser, validate, getTblUserId);
router.post("/postTblUser", validateUser, validate, postTblUser);

module.exports = router;
