const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblCompany } = require("../models");

const Op = Sequelize.Op;

const getAllTblCompany = async (req, res) => {
    const tblCompanyData = await tblCompany.findAll({
        order: [["ID", "ASC"]],
    });

    return res.json(tblCompanyData);
};

const getTblCompanyId = async (req, res) => {
    const { ID } = req.body;

    const tblCompanyID = await tblCompany.findOne({
        attributes: ["ID"],
        where: { ID: ID },
    });

    return res.json(tblCompanyID);
};

const postTblCompany = async (req, res) => {
    const {
        ID,
        COMPANY_NAME,
        COMPANY_ADDRESS,
        DTI,
        PPA_NO,
        PPA,
        PORT,
        SHOW_COMPNAME,
    } = req.body;

    await tblCompany.create({
        ID: ID,
        COMPANY_NAME: COMPANY_NAME,
        COMPANY_ADDRESS: COMPANY_ADDRESS,
        DTI: DTI,
        PPA_NO: PPA_NO,
        PPA: PPA,
        PORT: PORT,
        SHOW_COMPNAME: SHOW_COMPNAME,
    });

    return res.json("SUCCESS");
};

router.get("/getAllTblCompany", validateUser, validate, getAllTblCompany);
router.post("/getTblCompanyId", validateUser, validate, getTblCompanyId);
router.post("/postTblCompany", validateUser, validate, postTblCompany);

module.exports = router;
