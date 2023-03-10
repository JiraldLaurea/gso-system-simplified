const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { BusinessPermit } = require("../models");
const { ShortenedBusinessPermit } = require("../models");
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

const getAllBusinessPermit = async (req, res) => {
    const businessPermit = await BusinessPermit.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(businessPermit);
};

const getBusinessPermit = async (req, res) => {
    const { barangayId } = req.body;

    const businessPermit = await BusinessPermit.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(businessPermit);
};

const getUserBusinessPermit = async (req, res) => {
    const user = res.locals.user;

    const businessPermit = await BusinessPermit.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(businessPermit);
};

const getAllUpdatedBusinessPermit = async (req, res) => {
    const businessPermit = await BusinessPermit.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(businessPermit);
};

const getUpdatedBusinessPermit = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const businessPermit = await BusinessPermit.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(businessPermit);
};

const getAllUpdatedBusinessPermitYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await BusinessPermit.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserBusinessPermitYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const businessPermit = await BusinessPermit.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(businessPermit);
};

const getUpdatedUserBusinessPermitUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const businessPermit = await BusinessPermit.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(businessPermit);
};

const getBusinessPermitYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const businessPermit = await BusinessPermit.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(businessPermit);
};

const createBusinessPermit = async (req, res) => {
    const {
        yearSubmitted,
        dateIssued,
        documentName,
        barangayName,
        districtName,
        barangayId,
        userId,
        businessPermitUrl,
    } = req.body;

    const businessPermit = await BusinessPermit.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        dateIssued: dateIssued,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        businessPermitUrl: businessPermitUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            businessPermit: true,
            businessPermitDate: dateIssued,
        });
    });

    return res.json(businessPermit);
};

const getShortenedBusinessPermitYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const businessPermit = await BusinessPermit.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(businessPermit);
};

const createShortenedBusinessPermit = async (req, res) => {
    const { yearSubmitted, dateIssued, documentName, businessPermitUrl } =
        req.body;
    const user = res.locals.user;

    const businessPermit = await BusinessPermit.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        dateIssued: dateIssued,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        businessPermitUrl: businessPermitUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            businessPermit: true,
            businessPermitDate: dateIssued,
        });
    });

    return res.json(businessPermit);
};

router.post(
    "/getBusinessPermitYear",
    validateUser,
    validate,
    getBusinessPermitYear
);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.get(
    "/getAllBusinessPermit",
    validateUser,
    validate,
    getAllBusinessPermit
);
router.post("/getBusinessPermit", validateUser, validate, getBusinessPermit);
router.get(
    "/getUserBusinessPermit",
    validateUser,
    validate,
    getUserBusinessPermit
);
router.get(
    "/getAllUpdatedBusinessPermit",
    validateUser,
    validate,
    getAllUpdatedBusinessPermit
);
router.post(
    "/getUpdatedBusinessPermit",
    validateUser,
    validate,
    getUpdatedBusinessPermit
);
router.post(
    "/getAllUpdatedBusinessPermitYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedBusinessPermitYearSubmitted
);
router.get(
    "/getAllUpdatedUserBusinessPermitYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserBusinessPermitYearSubmitted
);
router.post(
    "/getUpdatedUserBusinessPermitUrl",
    validateUser,
    validate,
    getUpdatedUserBusinessPermitUrl
);
router.post(
    "/createBusinessPermit",
    validateUser,
    validate,
    createBusinessPermit
);
router.post(
    "/getShortenedBusinessPermitYear",
    validateUser,
    validate,
    getShortenedBusinessPermitYear
);
router.post(
    "/createShortenedBusinessPermit",
    validateUser,
    validate,
    createShortenedBusinessPermit
);

module.exports = router;
