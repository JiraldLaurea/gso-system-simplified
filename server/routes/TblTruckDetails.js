const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblTruckDetails } = require("../models");

const Op = Sequelize.Op;

const getAllTblTruckDetails = async (req, res) => {
    const tblTruckDetailsData = await tblTruckDetails.findAll({
        order: [["WT_SLIP_NO", "ASC"]],
    });

    return res.json(tblTruckDetailsData);
};

const getTblTruckDetailsId = async (req, res) => {
    const { WT_SLIP_NO } = req.body;

    const tblTruckDetailsID = await tblTruckDetails.findOne({
        attributes: ["WT_SLIP_NO"],
        where: { WT_SLIP_NO: WT_SLIP_NO },
    });

    return res.json(tblTruckDetailsID);
};

const postTblTruckDetails = async (req, res) => {
    const {
        WT_SLIP_NO,
        PPA,
        PPA_NO,
        COMPANY_NAME,
        COMPANY_ADD,
        DTI,
        DATE,
        HOURS,
        VEHICLE_TYPE,
        PLATE_NO,
        VESSEL_NAME,
        TRIP_NO,
        SCALE_RATE,
        VAT,
        AMOUNT,
        OR_NO,
        AXLE1,
        AXLE2,
        AXLE3,
        AXLE4,
        AXLE5,
        AXLE6,
        TOTAL_WEIGHT,
        REMARKS,
        SCALE_OPERATOR,
        DATE_WEIGHTED,
    } = req.body;

    await tblTruckDetails.create({
        WT_SLIP_NO: WT_SLIP_NO,
        PPA: PPA,
        PPA_NO: PPA_NO,
        COMPANY_NAME: COMPANY_NAME,
        COMPANY_ADD: COMPANY_ADD,
        DTI: DTI,
        DATE: DATE,
        HOURS: HOURS,
        VEHICLE_TYPE: VEHICLE_TYPE,
        PLATE_NO: PLATE_NO,
        VESSEL_NAME: VESSEL_NAME,
        TRIP_NO: TRIP_NO,
        SCALE_RATE: SCALE_RATE,
        VAT: VAT,
        AMOUNT: AMOUNT,
        OR_NO: OR_NO,
        AXLE1: AXLE1,
        AXLE2: AXLE2,
        AXLE3: AXLE3,
        AXLE4: AXLE4,
        AXLE5: AXLE5,
        AXLE6: AXLE6,
        TOTAL_WEIGHT: TOTAL_WEIGHT,
        REMARKS: REMARKS,
        SCALE_OPERATOR: SCALE_OPERATOR,
        DATE_WEIGHTED: DATE_WEIGHTED,
    });

    return res.json("SUCCESS");
};

router.get(
    "/getAllTblTruckDetails",
    validateUser,
    validate,
    getAllTblTruckDetails
);
router.post(
    "/getTblTruckDetailsId",
    validateUser,
    validate,
    getTblTruckDetailsId
);
router.post(
    "/postTblTruckDetails",
    validateUser,
    validate,
    postTblTruckDetails
);

module.exports = router;
