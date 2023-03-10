const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Junkshop } = require("../models");
const { ShortenedJunkshop } = require("../models");
const { Submission } = require("../models");
const { ActionSelectedBarangay } = require("../models");
const path = require("path");
const fs = require("fs").promises;

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

const convertToPDF = async (req, res) => {
    const ext = ".pdf";
    const file = req.files.file;

    let pdfBuf = await libre.convertAsync(file.data, ext, undefined);

    return res.json({
        file: `${path.parse(file.name).name}${ext}`,
        pdfBuf: pdfBuf,
    });
};

const getAllJunkshop = async (req, res) => {
    const junkshop = await Junkshop.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(junkshop);
};

const getJunkshop = async (req, res) => {
    const { barangayId } = req.body;

    const junkshop = await Junkshop.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(junkshop);
};

const getUserJunkshop = async (req, res) => {
    const user = res.locals.user;

    const junkshop = await Junkshop.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(junkshop);
};

const getAllUpdatedJunkshop = async (req, res) => {
    const junkshop = await Junkshop.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(junkshop);
};

const getUpdatedJunkshop = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const junkshop = await Junkshop.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(junkshop);
};

const getAllUpdatedJunkshopYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await Junkshop.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserJunkshopYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const junkshop = await Junkshop.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(junkshop);
};

const getUpdatedUserJunkshopUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const junkshop = await Junkshop.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(junkshop);
};

const getJunkshopYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const junkshop = await Junkshop.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(junkshop);
};

const createJunkshop = async (req, res) => {
    const {
        yearSubmitted,
        junkshopName,
        documentName,
        barangayName,
        districtName,
        barangayId,
        userId,
        junkshopUrl,
    } = req.body;

    const junkshop = await Junkshop.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        junkshopName: junkshopName,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        junkshopUrl: junkshopUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            junkshopInBarangay: true,
            junkshopName: junkshopName,
        });
    });

    return res.json(junkshop);
};

const getShortenedJunkshopYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const junkshop = await Junkshop.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(junkshop);
};

const createShortenedJunkshop = async (req, res) => {
    const { yearSubmitted, junkshopName, documentName, junkshopUrl } = req.body;
    const user = res.locals.user;

    const junkshop = await Junkshop.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        junkshopName: junkshopName,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        junkshopUrl: junkshopUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            junkshopInBarangay: true,
            junkshopName: junkshopName,
        });
    });

    return res.json(junkshop);
};

router.post("/getJunkshopYear", validateUser, validate, getJunkshopYear);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.get("/getAllJunkshop", validateUser, validate, getAllJunkshop);
router.post("/getJunkshop", validateUser, validate, getJunkshop);
router.get("/getUserJunkshop", validateUser, validate, getUserJunkshop);
router.get(
    "/getAllUpdatedJunkshop",
    validateUser,
    validate,
    getAllUpdatedJunkshop
);
router.post("/getUpdatedJunkshop", validateUser, validate, getUpdatedJunkshop);
router.post(
    "/getAllUpdatedJunkshopYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedJunkshopYearSubmitted
);
router.get(
    "/getAllUpdatedUserJunkshopYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserJunkshopYearSubmitted
);
router.post(
    "/getUpdatedUserJunkshopUrl",
    validateUser,
    validate,
    getUpdatedUserJunkshopUrl
);
router.post("/createJunkshop", validateUser, validate, createJunkshop);
router.post(
    "/getShortenedJunkshopYear",
    validateUser,
    validate,
    getShortenedJunkshopYear
);
router.post(
    "/createShortenedJunkshop",
    validateUser,
    validate,
    createShortenedJunkshop
);

module.exports = router;
