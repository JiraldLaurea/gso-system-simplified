module.exports = (sequelize, DataTypes) => {
    const MemorandumOfAgreement = sequelize.define(
        "MemorandumOfAgreement",
        {
            documentName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            yearSubmitted: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dateOfCreation: {
                type: DataTypes.STRING,
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
            memorandumOfAgreementUrl: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return MemorandumOfAgreement;
};
