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
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            ticketno: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            customer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            commodity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            plateno: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            weighin: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            datetimein: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            weighout: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            datetimeout: {
                type: DataTypes.DATE,
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
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            secondprint: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            note: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblTransaction;
};
