module.exports = (sequelize, DataTypes) => {
    const tblVehicleType = sequelize.define(
        "tblVehicleType",
        {
            vid: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            vehicle_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rate: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            vat: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblVehicleType;
};
