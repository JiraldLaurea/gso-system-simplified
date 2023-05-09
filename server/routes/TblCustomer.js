const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblCustomer } = require("../models");

const Op = Sequelize.Op;

const getTblCustomerId = async (req, res) => {
    const { CustomerID } = req.body;

    const tblCustomerID = await tblCustomer.findOne({
        attributes: ["CustomerID"],
        where: { CustomerID: CustomerID },
    });

    return res.json(tblCustomerID);
};

const postTblCustomer = async (req, res) => {
    const { CustomerID, Desc, Suspended } = req.body;

    await tblCustomer.create({
        CustomerID: CustomerID,
        Desc: Desc,
        Suspended: Suspended,
    });

    return res.json("SUCCESS");
};

router.post("/getTblCustomerId", validateUser, validate, getTblCustomerId);
router.post("/postTblCustomer", validateUser, validate, postTblCustomer);

module.exports = router;
