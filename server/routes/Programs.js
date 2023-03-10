const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Programs } = require("../models");
const { ShortenedPrograms } = require("../models");
const { Submission } = require("../models");
const { ActionSelectedBarangay } = require("../models");
const path = require("path");
const fs = require("fs").promises;

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

const convertToPDF = async (req, res) => {
    const ext = ".pdf";
    const file = req.files.file;
    const user = res.locals.user;
    const fileExtension = path.extname(req.files.file.name);

    // if (req.files === null) {
    //     return res.status(400).json({ msg: "No file uploaded" });
    // }

    // file.mv(`../client/public/submissions/${file.name}`, (err) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }

    //     res.json({
    //         fileName: file.name,
    //         filePath: `/submissions/${file.name}`,
    //     });
    // });

    // const inputPath = path.join(
    //     __dirname,
    //     `../client/public/submissions/${file.name}`
    // );
    // const outputPath = path.join(
    //     __dirname,
    //     `../client/public/submissions/${path.parse(file.name).name}${ext}`
    // );

    // // Read file
    // const docxBuf = await fs.readFile(inputPath);

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)

    let pdfBuf = await libre.convertAsync(file.data, ext, undefined);

    return res.json({
        file: `${path.parse(file.name).name}${ext}`,
        pdfBuf: pdfBuf,
    });

    // await fs.writeFile(outputPath, pdfBuf);
};

const getAllPrograms = async (req, res) => {
    const programs = await Programs.findAll({
        order: [["barangayName", "ASC"]],
    });
    return res.json(programs);
};

const getProgram = async (req, res) => {
    const { barangayId } = req.body;

    const program = await Programs.findOne({
        where: {
            barangayId: barangayId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(program);
};

const getUserProgram = async (req, res) => {
    const user = res.locals.user;

    const program = await Programs.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(program);
};

const getAllUpdatedPrograms = async (req, res) => {
    const programs = await Programs.findAll({
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });
    return res.json(programs);
};

const getUpdatedPrograms = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const programs = await Programs.findAll({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(programs);
};

const getAllUpdatedProgramsYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmittted = await Programs.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmittted);
};

const getAllUpdatedUserProgramsYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const programs = await Programs.findAll({
        attributes: ["yearSubmitted"],
        group: "yearSubmitted",
        order: [["yearSubmitted", "ASC"]],
        where: { barangayId: user.barangayId },
    });

    return res.json(programs);
};

const getUpdatedUserProgramsUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const program = await Programs.findAll({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(program);
};

const getProgramsYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const programs = await Programs.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: selectedBarangay.barangayId,
        },
    });

    return res.json(programs);
};

const createPrograms = async (req, res) => {
    const {
        yearSubmitted,
        documentName,
        barangayName,
        districtName,
        barangayId,
        userId,
        programsUrl,
    } = req.body;

    const programs = await Programs.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        userId: userId,
        barangayId: barangayId,
        barangayName: barangayName,
        districtName: districtName,
        programsUrl: programsUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            programsDoc: true,
        });
    });

    return res.json(programs);
};

const getShortenedProgramsYear = async (req, res) => {
    const { yearSubmitted } = req.body;
    const user = res.locals.user;

    const programs = await Programs.findOne({
        where: {
            yearSubmitted: yearSubmitted,
            barangayId: user.barangayId,
        },
    });

    return res.json(programs);
};

const createShortenedPrograms = async (req, res) => {
    const { yearSubmitted, documentName, programsUrl } = req.body;
    const user = res.locals.user;

    const programs = await Programs.create({
        documentName: documentName,
        yearSubmitted: yearSubmitted,
        userId: user.id,
        barangayId: user.barangayId,
        barangayName: user.barangayName,
        districtName: user.districtName,
        programsUrl: programsUrl,
    });

    await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
        order: [["createdAt", "DESC"]],
    }).then((data) => {
        data.update({
            programsDoc: true,
        });
    });

    return res.json(programs);
};

router.post("/getProgramsYear", validateUser, validate, getProgramsYear);
router.post("/convertToPDF", validateUser, validate, convertToPDF);
router.get("/getAllPrograms", validateUser, validate, getAllPrograms);
router.post("/getProgram", validateUser, validate, getProgram);
router.get("/getUserProgram", validateUser, validate, getUserProgram);
router.get(
    "/getAllUpdatedPrograms",
    validateUser,
    validate,
    getAllUpdatedPrograms
);
router.post("/getUpdatedPrograms", validateUser, validate, getUpdatedPrograms);
router.post(
    "/getAllUpdatedProgramsYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedProgramsYearSubmitted
);
router.get(
    "/getAllUpdatedUserProgramsYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserProgramsYearSubmitted
);
router.post(
    "/getUpdatedUserProgramsUrl",
    validateUser,
    validate,
    getUpdatedUserProgramsUrl
);
router.post("/createPrograms", validateUser, validate, createPrograms);
router.post(
    "/getShortenedProgramsYear",
    validateUser,
    validate,
    getShortenedProgramsYear
);
router.post(
    "/createShortenedPrograms",
    validateUser,
    validate,
    createShortenedPrograms
);

module.exports = router;
