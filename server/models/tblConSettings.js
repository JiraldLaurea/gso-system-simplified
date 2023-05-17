module.exports = (sequelize, DataTypes) => {
    const tblConSettings = sequelize.define(
        "tblConSettings",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            portno: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            baudstring: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblConSettings;
};
