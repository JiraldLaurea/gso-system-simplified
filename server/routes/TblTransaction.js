const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblTransaction } = require("../models");

const Op = Sequelize.Op;

const getAllTblTransaction = async (req, res) => {
    const tblTransactionData = await tblTransaction.findAll({
        order: [["id", "ASC"]],
    });

    return res.json(tblTransactionData);
};

const getTblTransactionId = async (req, res) => {
    const { id } = req.body;

    const tblTransactionID = await tblTransaction.findOne({
        attributes: ["id"],
        where: { id: id },
    });

    return res.json(tblTransactionID);
};

const postTblTransaction = async (req, res) => {
    const {
        id,
        trandate,
        ticketno,
        customer,
        plateno,
        weighin,
        datetimein,
        weighout,
        datetimeout,
        driver,
        weigher,
        grosswt,
        tarewt,
        netwt,
        firstprint,
        secondprint,
        note,
    } = req.body;

    await tblTransaction.create({
        id: id,
        trandate: trandate,
        ticketno: ticketno,
        customer: customer,
        plateno: plateno,
        weighin: weighin,
        datetimein: datetimein,
        weighout: weighout,
        datetimeout: datetimeout,
        driver: driver,
        weigher: weigher,
        grosswt: grosswt,
        tarewt: tarewt,
        netwt: netwt,
        firstprint: firstprint,
        secondprint: secondprint,
        note: note,
    });

    return res.json("SUCCESS");
};

router.get(
    "/getAllTblTransaction",
    validateUser,
    validate,
    getAllTblTransaction
);
router.post(
    "/getTblTransactionId",
    validateUser,
    validate,
    getTblTransactionId
);
router.post("/postTblTransaction", validateUser, validate, postTblTransaction);

module.exports = router;
