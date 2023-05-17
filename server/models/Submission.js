module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define(
        "Submission",
        {
            populationCount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            yearSubmitted: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            barangayId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            barangayName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            districtName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            barangayProfile: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            totalWaste: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            collectionSchedule: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            sketch: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            programsDoc: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            fundingReq: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            moa: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            junkshopInBarangay: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            junkshopName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            businessPermit: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            businessPermitDate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            executiveOrder: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            executiveOrderNo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            executiveOrderDate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            barangayOrdinance: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            barangayOrdinanceNo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Submission;
};
