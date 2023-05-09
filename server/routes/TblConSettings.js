const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblConSettings } = require("../models");

const Op = Sequelize.Op;

const getTblConSettingsId = async (req, res) => {
    const { id } = req.body;

    const tblConSettingsID = await tblConSettings.findOne({
        attributes: ["id"],
        where: { id: id },
    });

    return res.json(tblConSettingsID);
};

const postTblConSettings = async (req, res) => {
    const { id, portno, baudstring } = req.body;

    await tblConSettings.create({
        id: id,
        portno: portno,
        baudstring: baudstring,
    });

    return res.json("SUCCESS");
};

router.post(
    "/getTblConSettingsId",
    validateUser,
    validate,
    getTblConSettingsId
);
router.post("/postTblConSettings", validateUser, validate, postTblConSettings);

module.exports = router;
