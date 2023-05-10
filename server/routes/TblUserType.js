const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblUserType } = require("../models");

const Op = Sequelize.Op;

const getAllTblUserType = async (req, res) => {
    const tblUserTypeData = await tblUserType.findAll({
        order: [["usertype_id", "ASC"]],
    });

    return res.json(tblUserTypeData);
};

const getTblUserTypeId = async (req, res) => {
    const { usertype_id } = req.body;

    const tblUserTypeID = await tblUserType.findOne({
        attributes: ["usertype_id"],
        where: { usertype_id: usertype_id },
    });

    return res.json(tblUserTypeID);
};

const postTblUserType = async (req, res) => {
    const { usertype_id, usertype } = req.body;

    await tblUserType.create({
        usertype_id: usertype_id,
        usertype: usertype,
    });

    return res.json("SUCCESS");
};

router.get("/getAllTblUserType", validateUser, validate, getAllTblUserType);
router.post("/getTblUserTypeId", validateUser, validate, getTblUserTypeId);
router.post("/postTblUserType", validateUser, validate, postTblUserType);

module.exports = router;
