const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Barangay, Sequelize } = require("../models");
const { User } = require("../models");
const { ActionSelectedBarangay } = require("../models");
const { CollectionSchedule } = require("../models");

const Op = Sequelize.Op;

const createCollectionSchedule = async (req, res) => {
    const user = res.locals.user;

    const { barangayName, districtName, routeNum, truckNum } = req.body;

    await CollectionSchedule.create({
        barangayName: barangayName,
        districtName: districtName,
        routeNum: routeNum,
        truckNum: truckNum,
    });

    res.json("SUCCESS");
};

router.post(
    "/createCollectionSchedule",
    validateUser,
    validate,
    createCollectionSchedule
);

module.exports = router;
