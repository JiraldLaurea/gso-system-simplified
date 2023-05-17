const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Concern } = require("../models");
const { ConcernComment } = require("../models");

// router.get("/", async (req, res) => {
//     const barangays = await Barangay.findAll();
//     res.json(barangays);
// });

const getConcerns = async (req, res) => {
    const concerns = await Concern.findAll({
        order: [["createdAt", "DESC"]],
    });
    return res.json(concerns);
};

const getConcern = async (req, res) => {
    const concernId = req.params.concernId;
    const concern = await Concern.findOne({
        where: {
            id: concernId,
        },
    });

    return res.json(concern);
};

const createConcern = async (req, res) => {
    const { text, imageUrl } = req.body;

    const user = res.locals.user;

    const concern = await Concern.create({
        concernText: text,
        concernImageUrl: imageUrl,
        username: user.username,
        barangayName: user.barangayName,
    });

    return res.json(concern);
};

const getConcernComments = async (req, res) => {
    const concernId = req.params.concernId;
    const concernComments = await ConcernComment.findAll({
        where: {
            concernId: concernId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(concernComments);
};

const createConcernComment = async (req, res) => {
    const { text } = req.body;
    const concernId = req.params.concernId;
    const user = res.locals.user;

    const concernComment = await ConcernComment.create({
        commentText: text,
        username: user.username,
        barangayName: user.barangayName,
        concernId: concernId,
    });

    return res.json(concernComment);
};

router.get("/", getConcerns);
router.get("/:concernId", getConcern);
router.post("/create", validateUser, validate, createConcern);
router.get("/getcomments/:concernId", getConcernComments);
router.post(
    "/comment/:concernId",
    validateUser,
    validate,
    createConcernComment
);

module.exports = router;
