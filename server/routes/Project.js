const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Project } = require("../models");

// router.get("/", async (req, res) => {
//     const barangays = await Barangay.findAll();
//     res.json(barangays);
// });

const getProject = async (req, res) => {
    const project = await Project.findAll({
        order: [["createdAt", "DESC"]],
    });
    return res.json(project);
};

const createProject = async (req, res) => {
    const {
        barangayName,
        actionPlan,
        objectives,
        activities,
        performanceIndicatorAndTerminal,
        baseline,
        assumption,
        meansOfVerification,
    } = req.body;

    const user = res.locals.user;

    const project = await Project.create({
        barangayName: barangayName,
        actionPlan: actionPlan,
        objectives: objectives,
        activities: activities,
        performanceIndicatorAndTerminal: performanceIndicatorAndTerminal,
        baseline: baseline,
        assumption: assumption,
        meansOfVerification: meansOfVerification,
    });

    return res.json(project);
};

router.get("/", getProject);
router.post("/create", validateUser, validate, createProject);

module.exports = router;
