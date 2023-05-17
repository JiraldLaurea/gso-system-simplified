const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Barangay, Sequelize } = require("../models");
const { User } = require("../models");
const { ActionSelectedBarangay } = require("../models");
const { RecyclableWastes } = require("../models");

const Op = Sequelize.Op;

const getRecyclableWastes = async (req, res) => {
    const { barangayId } = req.body;

    const recyclableWastes = await RecyclableWastes.findAll({
        order: [["dateSubmitted", "ASC"]],
        where: {
            barangayId: barangayId,
        },
    });

    res.json(recyclableWastes);
};

const getRecyclableWastesUser = async (req, res) => {
    const user = res.locals.user;

    const recyclableWastes = await RecyclableWastes.findAll({
        order: [["dateSubmitted", "ASC"]],
        where: {
            barangayId: user.barangayId,
        },
    });

    res.json(recyclableWastes);
};

const getEncodedRecyclableWastes = async (req, res) => {
    const user = res.locals.user;

    const recyclableWaste = await RecyclableWastes.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(recyclableWaste);
};

const getRecyclableWastesYear = async (req, res) => {
    const user = res.locals.user;

    const { yearSubmitted, barangayId } = req.body;

    if (user.isAdmin) {
        const recyclableWaste = await RecyclableWastes.findOne({
            where: {
                yearSubmitted: yearSubmitted,
                barangayId: barangayId,
            },
        });
        return res.json(recyclableWaste);
    } else {
        const recyclableWaste = await RecyclableWastes.findOne({
            where: {
                yearSubmitted: yearSubmitted,
                barangayId: user.barangayId,
            },
        });
        return res.json(recyclableWaste);
    }
};

const getSubmittedRecyclableWastes = async (req, res) => {
    const { barangayId } = req.body;

    const recyclableWastes = await RecyclableWastes.findAll({
        where: { barangayId: barangayId },
    });
    return res.json(recyclableWastes);
};

const getSubmittedRecyclableWastesMonth = async (req, res) => {
    const { dateSubmitted } = req.body;

    const recyclableWastes = await RecyclableWastes.findOne({
        where: { dateSubmitted: dateSubmitted },
    });

    return res.json(recyclableWastes);
};

const getSubmittedRecyclableWastesUser = async (req, res) => {
    const { dateSubmitted } = req.body;
    const user = res.locals.user;

    const recyclableWastes = await RecyclableWastes.findAll({
        where: { barangayId: user.barangayId, dateSubmitted: dateSubmitted },
    });
    return res.json(recyclableWastes);
};

const createRecyclableWastes = async (req, res) => {
    const user = res.locals.user;

    const {
        dateSubmitted,
        barangayId,
        barangayName,
        districtName,
        saway,
        lata,
        plastic,
        mineral,
        botelya,
        carton,
        aluminum,
        sin,
        scrap,
        kaldero,
        others,
    } = req.body;

    const totalWeightPerBarangay =
        Number(saway) +
        Number(lata) +
        Number(plastic) +
        Number(mineral) +
        Number(botelya) +
        Number(carton) +
        Number(aluminum) +
        Number(sin) +
        Number(scrap) +
        Number(kaldero) +
        Number(others);

    if (user.isAdmin) {
        await RecyclableWastes.create({
            dateSubmitted: dateSubmitted,
            barangayId: barangayId,
            barangayName: barangayName,
            districtName: districtName,
            saway: saway,
            lata: lata,
            plastic: plastic,
            mineral: mineral,
            botelya: botelya,
            carton: carton,
            aluminum: aluminum,
            sin: sin,
            scrap: scrap,
            kaldero: kaldero,
            others: others,
            totalWeightPerBarangay: totalWeightPerBarangay,
        });
    } else {
        await RecyclableWastes.create({
            dateSubmitted: dateSubmitted,
            barangayId: user.barangayId,
            barangayName: user.barangayName,
            districtName: user.districtName,
            saway: saway,
            lata: lata,
            plastic: plastic,
            mineral: mineral,
            botelya: botelya,
            carton: carton,
            aluminum: aluminum,
            sin: sin,
            scrap: scrap,
            kaldero: kaldero,
            others: others,
            totalWeightPerBarangay: totalWeightPerBarangay,
        });
    }

    res.json("SUCCESS");
};

router.post("/getRecyclableWastes", getRecyclableWastes);
router.get(
    "/getRecyclableWastesUser",
    validateUser,
    validate,
    getRecyclableWastesUser
);
router.get(
    "/getEncodedRecyclableWastes",
    validateUser,
    validate,
    getEncodedRecyclableWastes
);
router.post(
    "/getRecyclableWastesYear",
    validateUser,
    validate,
    getRecyclableWastesYear
);
router.post(
    "/getSubmittedRecyclableWastes",
    validateUser,
    validate,
    getSubmittedRecyclableWastes
);
router.post(
    "/getSubmittedRecyclableWastesMonth",
    validateUser,
    validate,
    getSubmittedRecyclableWastesMonth
);
router.post(
    "/getSubmittedRecyclableWastesUser",
    validateUser,
    validate,
    getSubmittedRecyclableWastesUser
);
router.post(
    "/createRecyclableWastes",
    validateUser,
    validate,
    createRecyclableWastes
);

module.exports = router;
