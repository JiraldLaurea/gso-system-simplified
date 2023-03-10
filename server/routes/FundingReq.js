const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { FundingReq } = require("../models");
const { ShortenedFundingReq } = require("../models");
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

const getAllFundingReq = async (req, res) => {
    const fundingReq = await FundingReq.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(fundingReq);
};

const getFundingReq = async (req, res) => {
    const { barangayId } = req.body;

    const fundingReq = await FundingReq.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(fundingReq);
};

const getUserFundingReq = async (req, res) => {
    const user = res.locals.user;

    const fundingReq = await FundingReq.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(fundingReq);
};

const getAllUpdatedFundingReq = async (req, res) => {
    const fundingReq = await FundingReq.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(fundingReq);
};

const getUpdatedFundingReq = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const fundingReq = await FundingReq.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(fundingReq);
};

const getAllUpdatedFundingReqYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await FundingReq.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserFundingReqYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const fundingReq = await FundingReq.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(fundingReq);
};

const getUpdatedUserFundingReqUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const fundingReq = await FundingReq.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(fundingReq);
};

const getFundingReqYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const fundingReq = await FundingReq.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(fundingReq);
};

const createFundingReq = async (req, res) => {
    const {
        yearSubmitted,
        documentName,
        barangayName,
        districtName,
        barangayId,
        userId,
        fundingReqUrl,
    } = req.body;

    const fundingReq = await FundingReq.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        fundingReqUrl: fundingReqUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            fundingReq: true,
        });
    });

    return res.json(fundingReq);
};

const getShortenedFundingReqYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const fundingReq = await FundingReq.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(fundingReq);
};

const createShortenedFundingReq = async (req, res) => {
    const { yearSubmitted, documentName, fundingReqUrl } = req.body;
    const user = res.locals.user;

    const fundingReq = await FundingReq.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        fundingReqUrl: fundingReqUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            fundingReq: true,
        });
    });

    return res.json(fundingReq);
};

router.post("/getFundingReqYear", validateUser, validate, getFundingReqYear);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.get("/getAllFundingReq", validateUser, validate, getAllFundingReq);
router.post("/getFundingReq", validateUser, validate, getFundingReq);
router.get("/getUserFundingReq", validateUser, validate, getUserFundingReq);
router.get(
    "/getAllUpdatedFundingReq",
    validateUser,
    validate,
    getAllUpdatedFundingReq
);
router.post(
    "/getUpdatedFundingReq",
    validateUser,
    validate,
    getUpdatedFundingReq
);
router.post(
    "/getAllUpdatedFundingReqYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedFundingReqYearSubmitted
);
router.get(
    "/getAllUpdatedUserFundingReqYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserFundingReqYearSubmitted
);
router.post(
    "/getUpdatedUserFundingReqUrl",
    validateUser,
    validate,
    getUpdatedUserFundingReqUrl
);
router.post("/createFundingReq", validateUser, validate, createFundingReq);
router.post(
    "/getShortenedFundingReqYear",
    validateUser,
    validate,
    getShortenedFundingReqYear
);
router.post(
    "/createShortenedFundingReq",
    validateUser,
    validate,
    createShortenedFundingReq
);

module.exports = router;
