module.exports = (sequelize, DataTypes) => {
    const tblCustomer = sequelize.define(
        "tblCustomer",
        {
            CustomerID: {
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
    return tblCustomer;
};
