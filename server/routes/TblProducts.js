const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Sequelize } = require("../models");
const { tblProducts } = require("../models");

const Op = Sequelize.Op;

const getAllTblProducts = async (req, res) => {
    const tblProductsData = await tblProducts.findAll({
        order: [["ProductID", "ASC"]],
    });

    return res.json(tblProductsData);
};

const getTblProductsId = async (req, res) => {
    const { ProductID } = req.body;

    const tblProductID = await tblProducts.findOne({
        attributes: ["ProductID"],
        where: { ProductID: ProductID },
    });

    return res.json(tblProductID);
};

const postTblProducts = async (req, res) => {
    const { ProductID, Desc, Suspended } = req.body;

    await tblProducts.create({
        ProductID: ProductID,
        Desc: Desc,
        Suspended: Suspended,
    });

    return res.json("SUCCESS");
};

router.get("/getAllTblProducts", validateUser, validate, getAllTblProducts);
router.post("/getTblProductsId", validateUser, validate, getTblProductsId);
router.post("/postTblProducts", validateUser, validate, postTblProducts);

module.exports = router;
