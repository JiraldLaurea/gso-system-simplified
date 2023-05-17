const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblVehicleType } = require("../models");

const Op = Sequelize.Op;

const getAllTblVehicleType = async (req, res) => {
    const tblVehicleTypeData = await tblVehicleType.findAll({
        order: [["vid", "ASC"]],
    });

    return res.json(tblVehicleTypeData);
};

const getTblVehicleTypeId = async (req, res) => {
    const { vid } = req.body;

    const tblVehicleTypeID = await tblVehicleType.findOne({
        attributes: ["vid"],
        where: { vid: vid },
    });

    return res.json(tblVehicleTypeID);
};

const postTblVehicleType = async (req, res) => {
    const { vid, vehicle_type, rate, vat, amount } = req.body;

    await tblVehicleType.create({
        vid: vid,
        vehicle_type: vehicle_type,
        rate: rate,
        vat: vat,
        amount: amount,
    });

    return res.json("SUCCESS");
};

router.get(
    "/getAllTblVehicleType",
    validateUser,
    validate,
    getAllTblVehicleType
);
router.post(
    "/getTblVehicleTypeId",
    validateUser,
    validate,
    getTblVehicleTypeId
);
router.post("/postTblVehicleType", validateUser, validate, postTblVehicleType);

module.exports = router;
