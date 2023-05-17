module.exports = (sequelize, DataTypes) => {
    const RecyclableWastes = sequelize.define(
        "RecyclableWastes",
        {
            dateSubmitted: {
                type: DataTypes.DATEONLY,
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
            saway: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            lata: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            plastic: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            mineral: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            botelya: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            carton: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            aluminum: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            sin: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            scrap: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            kaldero: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            others: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            totalWeightPerBarangay: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return RecyclableWastes;
};
