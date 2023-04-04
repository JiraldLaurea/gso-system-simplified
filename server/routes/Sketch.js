const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sketch } = require("../models");
const { ShortenedSketch } = require("../models");
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

const getAllSketch = async (req, res) => {
    const sketches = await Sketch.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(sketches);
};

const getSketch = async (req, res) => {
    const { barangayId } = req.body;

    const sketch = await Sketch.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(sketch);
};

const getUserSketch = async (req, res) => {
    const user = res.locals.user;

    const sketch = await Sketch.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(sketch);
};

const getAllUpdatedSketch = async (req, res) => {
    const sketches = await Sketch.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(sketches);
};

const getUpdatedSketch = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const sketch = await Sketch.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(sketch);
};

const getAllUpdatedSketchYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await Sketch.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserSketchYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const sketch = await Sketch.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(sketch);
};

const getUpdatedUserSketchUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const sketch = await Sketch.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(sketch);
};

const getSketchYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const sketch = await Sketch.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(sketch);
};

const createSketch = async (req, res) => {
    const {
        yearSubmitted,
        collectionSchedule,
        documentName,
        barangayName,
        districtName,
        barangayId,
        userId,
        sketchUrl,
    } = req.body;

    const sketch = await Sketch.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        collectionSchedule: collectionSchedule,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        sketchUrl: sketchUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            sketch: true,
            collectionSchedule: collectionSchedule,
        });
    });

    return res.json(sketch);
};

const getShortenedSketchYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const sketch = await Sketch.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(sketch);
};

const createShortenedSketch = async (req, res) => {
    const { yearSubmitted, collectionSchedule, documentName, sketchUrl } =
        req.body;
    const user = res.locals.user;

    const sketch = await Sketch.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        collectionSchedule: collectionSchedule,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        sketchUrl: sketchUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            collectionSchedule: collectionSchedule,
            sketch: true,
        });
    });

    return res.json(sketch);
};

const updateSubmissionSketch = async (req, res) => {};
router.get("/getAllSketch", validateUser, validate, getAllSketch);
router.post("/getSketch", validateUser, validate, getSketch);
router.get("/getUserSketch", validateUser, validate, getUserSketch);
router.get("/getAllUpdatedSketch", validateUser, validate, getAllUpdatedSketch);
router.post("/getUpdatedSketch", validateUser, validate, getUpdatedSketch);
router.post(
    "/getAllUpdatedSketchYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedSketchYearSubmitted
);
router.get(
    "/getAllUpdatedUserSketchYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserSketchYearSubmitted
);
router.post(
    "/getUpdatedUserSketchUrl",
    validateUser,
    validate,
    getUpdatedUserSketchUrl
);
router.post("/getSketchYear", validateUser, validate, getSketchYear);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.post("/createSketch", validateUser, validate, createSketch);
router.post(
    "/getShortenedSketchYear",
    validateUser,
    validate,
    getShortenedSketchYear
);
router.post(
    "/createShortenedSketch",
    validateUser,
    validate,
    createShortenedSketch
);

module.exports = router;
