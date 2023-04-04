const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Barangay, Sequelize } = require("../models");
const { User } = require("../models");
const { ActionSelectedBarangay } = require("../models");
const { RecyclableWastes } = require("../models");
const { ActualWastes } = require("../models");

const Op = Sequelize.Op;

const getActualWastes = async (req, res) => {
    const actualWastes = await ActualWastes.findAll({
        order: [["dateOfSubmission", "DESC"]],
    });

    res.json(actualWastes);
};

const getActualWastesMonth = async (req, res) => {
    const actualWastes = await ActualWastes.findAll();

    if (actualWastes.length != 0) {
        const dateOfSubmissions = await ActualWastes.findAll({
            attributes: [
                "dateOfSubmission",
                [
                    Sequelize.fn("sum", Sequelize.col("actualWastes")),
                    "groupedActualWastes",
                ],
            ],
            group: Sequelize.literal("SUBSTRING(dateOfSubmission, 1, 7)"),
            order: Sequelize.literal("dateOfSubmission ASC"),
        });

        res.json(dateOfSubmissions);
    } else {
        res.json(null);
    }
};

const getActualWastesMonthAverage = async (req, res) => {
    const actualWastes = await ActualWastes.findAll();

    if (actualWastes.length != 0) {
        const dateOfSubmissions = await ActualWastes.findAll({
            attributes: [
                "dateOfSubmission",
                [
                    Sequelize.fn("AVG", Sequelize.col("actualWastes")),
                    "groupedActualWastes",
                ],
            ],
            group: Sequelize.literal("SUBSTRING(dateOfSubmission, 1, 7)"),
            order: Sequelize.literal("dateOfSubmission ASC"),
        });

        res.json(dateOfSubmissions);
    } else {
        res.json(null);
    }
};

const getActualWastesYear = async (req, res) => {
    const actualWastes = await ActualWastes.findAll();

    if (actualWastes.length != 0) {
        const dateOfSubmissions = await ActualWastes.findAll({
            attributes: [
                "dateOfSubmission",
                [
                    Sequelize.fn("sum", Sequelize.col("actualWastes")),
                    "groupedActualWastes",
                ],
            ],
            group: Sequelize.literal("SUBSTRING(dateOfSubmission, 1, 4)"),
            order: Sequelize.literal("dateOfSubmission ASC"),
        });
        res.json(dateOfSubmissions);
    } else {
        res.json(null);
    }
};

const getActualWastesYearAverage = async (req, res) => {
    const actualWastes = await ActualWastes.findAll();

    if (actualWastes.length != 0) {
        const dateOfSubmissions = await ActualWastes.findAll({
            attributes: [
                "dateOfSubmission",
                [
                    Sequelize.fn("AVG", Sequelize.col("actualWastes")),
                    "groupedActualWastes",
                ],
            ],
            group: Sequelize.literal("SUBSTRING(dateOfSubmission, 1, 4)"),
            order: Sequelize.literal("dateOfSubmission ASC"),
        });

        res.json(dateOfSubmissions);
    } else {
        res.json(null);
    }
};

const getActualWastesUser = async (req, res) => {
    const user = res.locals.user;

    const actualWastes = await ActualWastes.findAll({
        order: [["yearSubmitted", "ASC"]],
        where: {
            barangayId: user.barangayId,
        },
    });

    res.json(actualWastes);
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

const getSubmittedActualWastes = async (req, res) => {
    const { dateOfSubmission } = req.body;

    const actualWastes = await ActualWastes.findOne({
        where: { dateOfSubmission: dateOfSubmission },
    });
    return res.json(actualWastes);
};

const getSubmittedRecyclableWastesUser = async (req, res) => {
    const { dateSubmitted } = req.body;
    const user = res.locals.user;

    const recyclableWastes = await RecyclableWastes.findAll({
        where: { barangayId: user.barangayId, dateSubmitted: dateSubmitted },
    });
    return res.json(recyclableWastes);
};

const createActualWastes = async (req, res) => {
    const { dateOfSubmission, actualWastes, remarks } = req.body;

    await ActualWastes.create({
        dateOfSubmission: dateOfSubmission,
        actualWastes: actualWastes,
        remarks: remarks,
    });

    res.json("SUCCESS");
};

router.get("/getActualWastes", getActualWastes);
router.get("/getActualWastesMonth", getActualWastesMonth);
router.get("/getActualWastesMonthAverage", getActualWastesMonthAverage);
router.get("/getActualWastesYear", getActualWastesYear);
router.get("/getActualWastesYearAverage", getActualWastesYearAverage);
router.get("/getActualWastesUser", validateUser, validate, getActualWastesUser);
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
    "/getSubmittedActualWastes",
    validateUser,
    validate,
    getSubmittedActualWastes
);
router.post(
    "/getSubmittedRecyclableWastesUser",
    validateUser,
    validate,
    getSubmittedRecyclableWastesUser
);
router.post("/createActualWastes", validateUser, validate, createActualWastes);

module.exports = router;
