const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Announcement } = require("../models");
const { AnnouncementComment } = require("../models");

const getAnnouncements = async (req, res) => {
    const announcements = await Announcement.findAll({
        order: [["createdAt", "DESC"]],
    });
    return res.json(announcements);
};

const getAnnouncement = async (req, res) => {
    const announcementId = req.params.announcementId;
    const announcement = await Announcement.findOne({
        where: {
            id: announcementId,
        },
    });

    return res.json(announcement);
};

const createAnnouncement = async (req, res) => {
    const { text, imageUrl } = req.body;

    const user = res.locals.user;

    const announcement = await Announcement.create({
        announcementText: text,
        announcementImageUrl: imageUrl,
        username: user.username,
        barangayName: user.barangayName,
    });

    return res.json(announcement);
};

const getAnnouncementComments = async (req, res) => {
    const announcementId = req.params.announcementId;
    const announcementComments = await AnnouncementComment.findAll({
        where: {
            announcementId: announcementId,
        },
        order: [["createdAt", "DESC"]],
    });

    return res.json(announcementComments);
};

const createAnnouncementComment = async (req, res) => {
    const { text } = req.body;
    const announcementId = req.params.announcementId;
    const user = res.locals.user;

    const announcementComment = await AnnouncementComment.create({
        commentText: text,
        username: user.username,
        barangayName: user.barangayName,
        announcementId: announcementId,
    });

    return res.json(announcementComment);
};

router.get("/", getAnnouncements);
router.get("/:announcementId", getAnnouncement);
router.post("/create", validateUser, validate, createAnnouncement);
router.get("/getcomments/:announcementId", getAnnouncementComments);
router.post(
    "/comment/:announcementId",
    validateUser,
    validate,
    createAnnouncementComment
);

module.exports = router;
