const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { ExecutiveOrder } = require("../models");
const { ShortenedExecutiveOrder } = require("../models");
const { ActionSelectedBarangay } = require("../models");
const { Submission } = require("../models");
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

const getAllExecutiveOrder = async (req, res) => {
    const executiveOrder = await ExecutiveOrder.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(executiveOrder);
};

const getExecutiveOrder = async (req, res) => {
    const { barangayId } = req.body;

    const executiveOrder = await ExecutiveOrder.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(executiveOrder);
};

const getUserExecutiveOrder = async (req, res) => {
    const user = res.locals.user;

    const executiveOrder = await ExecutiveOrder.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(executiveOrder);
};

const getAllUpdatedExecutiveOrder = async (req, res) => {
    const executiveOrder = await ExecutiveOrder.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(executiveOrder);
};

const getUpdatedExecutiveOrder = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const executiveOrder = await ExecutiveOrder.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(executiveOrder);
};

const getAllUpdatedExecutiveOrderYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await ExecutiveOrder.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserExecutiveOrderYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const executiveOrder = await ExecutiveOrder.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(executiveOrder);
};

const getUpdatedUserExecutiveOrderUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const executiveOrder = await ExecutiveOrder.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(executiveOrder);
};

const getExecutiveOrderYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const executiveOrder = await ExecutiveOrder.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(executiveOrder);
};

const createExecutiveOrder = async (req, res) => {
    const {
        yearSubmitted,
        executiveOrderNo,
        dateIssued,
        documentName,
        barangayName,
        districtName,
        barangayId,
        userId,
        executiveOrderUrl,
    } = req.body;

    const executiveOrder = await ExecutiveOrder.create({
        documentName: documentName,
        executiveOrderNo: executiveOrderNo,
        yearSubmitted: yearSubmitted,
        dateIssued: dateIssued,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        executiveOrderUrl: executiveOrderUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            executiveOrder: true,
            executiveOrderNo: executiveOrderNo,
            executiveOrderDate: dateIssued,
        });
    });

    return res.json(executiveOrder);
};

const getShortenedExecutiveOrderYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const executiveOrder = await ExecutiveOrder.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(executiveOrder);
};

const createShortenedExecutiveOrder = async (req, res) => {
    const { yearSubmitted, dateIssued, documentName, executiveOrderUrl } =
        req.body;
    const user = res.locals.user;

    const executiveOrder = await ExecutiveOrder.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        dateIssued: dateIssued,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        executiveOrderUrl: executiveOrderUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            executiveOrder: true,
            executiveOrderDate: dateIssued,
        });
    });

    return res.json(executiveOrder);
};

router.post(
    "/getExecutiveOrderYear",
    validateUser,
    validate,
    getExecutiveOrderYear
);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.get(
    "/getAllExecutiveOrder",
    validateUser,
    validate,
    getAllExecutiveOrder
);
router.post("/getExecutiveOrder", validateUser, validate, getExecutiveOrder);
router.get(
    "/getUserExecutiveOrder",
    validateUser,
    validate,
    getUserExecutiveOrder
);
router.get(
    "/getAllUpdatedExecutiveOrder",
    validateUser,
    validate,
    getAllUpdatedExecutiveOrder
);
router.post(
    "/getUpdatedExecutiveOrder",
    validateUser,
    validate,
    getUpdatedExecutiveOrder
);
router.post(
    "/getAllUpdatedExecutiveOrderYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedExecutiveOrderYearSubmitted
);
router.get(
    "/getAllUpdatedUserExecutiveOrderYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserExecutiveOrderYearSubmitted
);
router.post(
    "/getUpdatedUserExecutiveOrderUrl",
    validateUser,
    validate,
    getUpdatedUserExecutiveOrderUrl
);
router.post(
    "/createExecutiveOrder",
    validateUser,
    validate,
    createExecutiveOrder
);
router.post(
    "/getShortenedExecutiveOrderYear",
    validateUser,
    validate,
    getShortenedExecutiveOrderYear
);
router.post(
    "/createShortenedExecutiveOrder",
    validateUser,
    validate,
    createShortenedExecutiveOrder
);

module.exports = router;
