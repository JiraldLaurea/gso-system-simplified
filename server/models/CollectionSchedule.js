module.exports = (sequelize, DataTypes) => {
    const CollectionSchedule = sequelize.define(
        "CollectionSchedule",
        {
            barangayName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            districtName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            routeNum: {
                type: DataTypes.INTEGER,
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
