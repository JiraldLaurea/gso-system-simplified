const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { BarangayOrdinance } = require("../models");
const { ShortenedBarangayOrdinance } = require("../models");
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

const getAllBarangayOrdinance = async (req, res) => {
    const barangayOrdinance = await BarangayOrdinance.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(barangayOrdinance);
};

const getBarangayOrdinance = async (req, res) => {
    const { barangayId } = req.body;

    const barangayOrdinance = await BarangayOrdinance.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(barangayOrdinance);
};

const getUserBarangayOrdinance = async (req, res) => {
    const user = res.locals.user;

    const barangayOrdinance = await BarangayOrdinance.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(barangayOrdinance);
};

const getAllUpdatedBarangayOrdinance = async (req, res) => {
    const barangayOrdinance = await BarangayOrdinance.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(barangayOrdinance);
};

const getUpdatedBarangayOrdinance = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const barangayOrdinance = await BarangayOrdinance.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(barangayOrdinance);
};

const getAllUpdatedBarangayOrdinanceYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await BarangayOrdinance.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserBarangayOrdinanceYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const barangayOrdinance = await BarangayOrdinance.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(barangayOrdinance);
};

const getUpdatedUserBarangayOrdinanceUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const barangayOrdinance = await BarangayOrdinance.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(barangayOrdinance);
};

const getBarangayOrdinanceYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const barangayOrdinance = await BarangayOrdinance.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(barangayOrdinance);
};

const createBarangayOrdinance = async (req, res) => {
    const {
        yearSubmitted,
        documentName,
        barangayOrdinanceNo,
        barangayName,
        districtName,
        barangayId,
        userId,
        barangayOrdinanceUrl,
    } = req.body;

    const barangayOrdinance = await BarangayOrdinance.create({
        documentName: documentName,
        barangayOrdinanceNo: barangayOrdinanceNo,
        yearSubmitted: yearSubmitted,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        barangayOrdinanceUrl: barangayOrdinanceUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            barangayOrdinance: true,
            barangayOrdinanceNo: barangayOrdinanceNo,
        });
    });

    return res.json(barangayOrdinance);
};

const getShortenedBarangayOrdinanceYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const barangayOrdinance = await BarangayOrdinance.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(barangayOrdinance);
};

const createShortenedBarangayOrdinance = async (req, res) => {
    const { yearSubmitted, documentName, barangayOrdinanceUrl } = req.body;
    const user = res.locals.user;

    const barangayOrdinance = await BarangayOrdinance.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        barangayOrdinanceUrl: barangayOrdinanceUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            barangayOrdinance: true,
        });
    });

    return res.json(barangayOrdinance);
};

router.post(
    "/getBarangayOrdinanceYear",
    validateUser,
    validate,
    getBarangayOrdinanceYear
);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.get(
    "/getAllBarangayOrdinance",
    validateUser,
    validate,
    getAllBarangayOrdinance
);
router.post(
    "/getBarangayOrdinance",
    validateUser,
    validate,
    getBarangayOrdinance
);
router.get(
    "/getUserBarangayOrdinance",
    validateUser,
    validate,
    getUserBarangayOrdinance
);
router.get(
    "/getAllUpdatedBarangayOrdinance",
    validateUser,
    validate,
    getAllUpdatedBarangayOrdinance
);
router.post(
    "/getUpdatedBarangayOrdinance",
    validateUser,
    validate,
    getUpdatedBarangayOrdinance
);
router.post(
    "/getAllUpdatedBarangayOrdinanceYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedBarangayOrdinanceYearSubmitted
);
router.get(
    "/getAllUpdatedUserBarangayOrdinanceYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserBarangayOrdinanceYearSubmitted
);
router.post(
    "/getUpdatedUserBarangayOrdinanceUrl",
    validateUser,
    validate,
    getUpdatedUserBarangayOrdinanceUrl
);
router.post(
    "/createBarangayOrdinance",
    validateUser,
    validate,
    createBarangayOrdinance
);
router.post(
    "/getShortenedBarangayOrdinanceYear",
    validateUser,
    validate,
    getShortenedBarangayOrdinanceYear
);
router.post(
    "/createShortenedBarangayOrdinance",
    validateUser,
    validate,
    createShortenedBarangayOrdinance
);

module.exports = router;
