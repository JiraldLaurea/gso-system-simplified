module.exports = (sequelize, DataTypes) => {
    const BarangayOrdinance = sequelize.define(
        "BarangayOrdinance",
        {
            documentName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            yearSubmitted: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
            barangayOrdinanceNo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            barangayOrdinanceUrl: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            createdAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return BarangayOrdinance;
};
