module.exports = (sequelize, DataTypes) => {
    const tblProducts = sequelize.define(
        "tblProducts",
        {
            ProductID: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Desc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Suspended: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblProducts;
};
