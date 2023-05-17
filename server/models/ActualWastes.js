module.exports = (sequelize, DataTypes) => {
    const ActualWastes = sequelize.define(
        "ActualWastes",
        {
            dateOfSubmission: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            actualWastes: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            remarks: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return ActualWastes;
};
