module.exports = (sequelize, DataTypes) => {
    const Concern = sequelize.define(
        "Concern",
        {
            concernText: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            concernImageUrl: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            barangayName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Concern;
};
