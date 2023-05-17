module.exports = (sequelize, DataTypes) => {
    const tblTransaction = sequelize.define(
        "tblTransaction",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            trandate: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ticketno: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            customer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            commodity: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            plateno: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            weighin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            datetimein: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            weighout: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            datetimeout: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            driver: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            weigher: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            grosswt: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            tarewt: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            netwt: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            firstprint: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            secondprint: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
    return tblTransaction;
};
