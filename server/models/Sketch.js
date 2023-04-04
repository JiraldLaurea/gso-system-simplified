module.exports = (sequelize, DataTypes) => {
    const Sketch = sequelize.define(
        "Sketch",
        {
            documentName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            yearSubmitted: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            collectionSchedule: {
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
            sketchUrl: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return Sketch;
};
