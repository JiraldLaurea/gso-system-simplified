const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Submission } = require("../models");
const { ShortenedBarangayProfile } = require("../models");
const { Barangay } = require("../models");
const sequelize = require("sequelize");
const { Sequelize } = require("../models");
const path = require("path");

const Op = Sequelize.Op;

router.get("/", async (req, res) => {
    const submissions = await Submission.findAll({
        attributes: [
            "id",
            "barangayName",
            "documentName",
            "populationCount",
            "createdAt",
            [
                sequelize.literal(
                    "(RANK() OVER (PARTITION BY barangayName ORDER BY createdAt DESC))"
                ),
                "rank",
            ],
        ],
    });

    res.json(submissions);
});

router.get("/all", async (req, res) => {
    const submissions = await Submission.findAll({
        where: {
            yearSubmitted: {
                [Op.ne]: null,
            },
        },
    });

    res.json(submissions);
});

router.post("/download", (req, res) => {
    const { fileName } = req.body;
    // res.json(fileName);
    res.download(`./public/submissions/${fileName}`);
});

const logout = (req, res) => {
    res.set(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        })
    );

    return res.status(200).json({ success: true });
};

const getSubmissions = async (req, res) => {
    const user = res.locals.user;

    const submissions = await Submission.findAll({
        where: {
            userId: user.id,
        },
    });

    res.json(submissions);
};

const getEncodedDocument = async (req, res) => {
    const user = res.locals.user;

    const encodedDocument = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    res.json(encodedDocument);
};

const getEncodedSWMPlan = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const swmPlan = await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
    });

    if (swmPlan) {
        res.json(true);
    } else {
        res.json(false);
    }
};

const submitSWMPlan = async (req, res) => {
    const {
        barangayName,
        districtName,
        populationCount,
        userId,
        barangayId,
        yearSubmitted,
    } = req.body;

    const totalWaste = (populationCount * 0.68).toFixed(2);

    await Submission.create({
        barangayName: barangayName,
        districtName: districtName,
        userId: userId,
        barangayId: barangayId,
        populationCount: populationCount,
        yearSubmitted: yearSubmitted,
        totalWaste: totalWaste,
        barangayProfile: true,
    });
};

const getEncodedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    const encodedBarangayProfile = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            barangayProfile: true,
        },
    });

    res.json(encodedBarangayProfile);
};

const getEncodedSketch = async (req, res) => {
    const user = res.locals.user;

    const encodedSketch = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            sketch: true,
        },
    });

    res.json(encodedSketch);
};

const getEncodedProgramsDoc = async (req, res) => {
    const user = res.locals.user;

    const encodedProgramsDoc = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            programsDoc: true,
        },
    });

    res.json(encodedProgramsDoc);
};

const getEncodedFundingReq = async (req, res) => {
    const user = res.locals.user;

    const encodedFundingReq = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            fundingReq: true,
        },
    });

    res.json(encodedFundingReq);
};

const getEncodedMoa = async (req, res) => {
    const user = res.locals.user;

    const encodedMoa = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            moa: {
                [Op.ne]: null,
            },
        },
    });

    res.json(encodedMoa);
};

const getEncodedJunkshop = async (req, res) => {
    const user = res.locals.user;

    const encodedJunkshop = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            junkshopInBarangay: true,
        },
    });

    res.json(encodedJunkshop);
};

const getEncodedBusinessPermit = async (req, res) => {
    const user = res.locals.user;

    const encodedBusinessPermit = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            businessPermit: true,
        },
    });

    res.json(encodedBusinessPermit);
};

const getEncodedExecutiveOrder = async (req, res) => {
    const user = res.locals.user;

    const encodedExecutiveOrder = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            executiveOrder: true,
        },
    });

    res.json(encodedExecutiveOrder);
};

const getEncodedBarangayOrdinance = async (req, res) => {
    const user = res.locals.user;

    const encodedBarangayOrdinance = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            barangayOrdinance: true,
        },
    });

    res.json(encodedBarangayOrdinance);
};

const getAllEncodedBarangayProfile = async (req, res) => {
    const encodedBarangayProfile = await Submission.findAll({
        where: {
            barangayProfile: true,
        },
        order: [["barangayName", "ASC"]],
    });
    return res.json(encodedBarangayProfile);
};

router.get("/submissions", validateUser, validate, getSubmissions);
router.get("/getEncodedDocument", validateUser, validate, getEncodedDocument);
router.post("/getEncodedSWMPlan", validateUser, validate, getEncodedSWMPlan);
router.post("/submitSWMPlan", validateUser, validate, submitSWMPlan);
router.get("/getEncodedSketch", validateUser, validate, getEncodedSketch);
router.get(
    "/getEncodedProgramsDoc",
    validateUser,
    validate,
    getEncodedProgramsDoc
);
router.get(
    "/getEncodedFundingReq",
    validateUser,
    validate,
    getEncodedFundingReq
);
router.get("/getEncodedMoa", validateUser, validate, getEncodedMoa);
router.get("/getEncodedJunkshop", validateUser, validate, getEncodedJunkshop);
router.get(
    "/getEncodedBusinessPermit",
    validateUser,
    validate,
    getEncodedBusinessPermit
);
router.get(
    "/getEncodedExecutiveOrder",
    validateUser,
    validate,
    getEncodedExecutiveOrder
);
router.get(
    "/getEncodedBarangayOrdinance",
    validateUser,
    validate,
    getEncodedBarangayOrdinance
);
router.get(
    "/getAllEncodedBarangayProfile",
    validateUser,
    validate,
    getAllEncodedBarangayProfile
);

module.exports = router;
