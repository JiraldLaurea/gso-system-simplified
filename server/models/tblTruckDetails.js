module.exports = (sequelize, DataTypes) => {
    const tblTruckDetails = sequelize.define(
        "tblTruckDetails",
        {
            WT_SLIP_NO: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            PPA: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            PPA_NO: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            COMPANY_NAME: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            COMPANY_ADD: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            DTI: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            DATE: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            HOURS: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            VEHICLE_TYPE: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            PLATE_NO: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            VESSEL_NAME: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            TRIP_NO: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            SCALE_RATE: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            VAT: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            AMOUNT: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            OR_NO: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            AXLE1: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            AXLE2: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            AXLE3: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            AXLE4: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            AXLE5: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            AXLE6: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            TOTAL_WEIGHT: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            REMARKS: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            SCALE_OPERATOR: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            DATE_WEIGHTED: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblTruckDetails;
};
