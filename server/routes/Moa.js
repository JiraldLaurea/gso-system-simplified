const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { MemorandumOfAgreement } = require("../models");
const { ShortenedMemorandumOfAgreement } = require("../models");
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

const getAllMoa = async (req, res) => {
    const moa = await MemorandumOfAgreement.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(moa);
};

const getMoa = async (req, res) => {
    const { barangayId } = req.body;

    const moa = await MemorandumOfAgreement.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(moa);
};

const getUserMoa = async (req, res) => {
    const user = res.locals.user;

    const moa = await MemorandumOfAgreement.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(moa);
};

const getAllUpdatedMoa = async (req, res) => {
    const moa = await MemorandumOfAgreement.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(moa);
};

const getUpdatedMoa = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const moa = await MemorandumOfAgreement.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(moa);
};

const getAllUpdatedMoaYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await MemorandumOfAgreement.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserMoaYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const moa = await MemorandumOfAgreement.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(moa);
};

const getUpdatedUserMoaUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const moa = await MemorandumOfAgreement.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(moa);
};

const getMoaYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const moa = await MemorandumOfAgreement.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(moa);
};

const createMoa = async (req, res) => {
    const {
        yearSubmitted,
        dateOfCreation,
        documentName,
        barangayName,
        districtName,
        barangayId,
        userId,
        memorandumOfAgreementUrl,
    } = req.body;

    const moa = await MemorandumOfAgreement.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        dateOfCreation: dateOfCreation,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        memorandumOfAgreementUrl: memorandumOfAgreementUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            moa: true,
        });
    });

    return res.json(moa);
};

const getShortenedMoaYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const moa = await MemorandumOfAgreement.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(moa);
};

const createShortenedMoa = async (req, res) => {
    const {
        yearSubmitted,
        dateOfCreation,
        documentName,
        memorandumOfAgreementUrl,
    } = req.body;
    const user = res.locals.user;

    const moa = await MemorandumOfAgreement.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        dateOfCreation: dateOfCreation,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        memorandumOfAgreementUrl: memorandumOfAgreementUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            moa: true,
        });
    });

    return res.json(moa);
};

router.post("/getMoaYear", validateUser, validate, getMoaYear);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.get("/getAllMoa", validateUser, validate, getAllMoa);
router.post("/getMoa", validateUser, validate, getMoa);
router.get("/getUserMoa", validateUser, validate, getUserMoa);
router.get("/getAllUpdatedMoa", validateUser, validate, getAllUpdatedMoa);
router.post("/getUpdatedMoa", validateUser, validate, getUpdatedMoa);
router.post(
    "/getAllUpdatedMoaYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedMoaYearSubmitted
);
router.get(
    "/getAllUpdatedUserMoaYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserMoaYearSubmitted
);
router.post(
    "/getUpdatedUserMoaUrl",
    validateUser,
    validate,
    getUpdatedUserMoaUrl
);
router.post("/createMoa", validateUser, validate, createMoa);
router.post(
    "/getShortenedMoaYear",
    validateUser,
    validate,
    getShortenedMoaYear
);
router.post("/createShortenedMoa", validateUser, validate, createShortenedMoa);

module.exports = router;
