module.exports = (sequelize, DataTypes) => {
    const CollectionSchedule = sequelize.define(
        "CollectionSchedule",
        {
            routeNum: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            barangay: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            truckNum: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return CollectionSchedule;
};
