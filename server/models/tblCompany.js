module.exports = (sequelize, DataTypes) => {
    const tblCompany = sequelize.define(
        "tblCompany",
        {
            ID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            COMPANY_NAME: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            COMPANY_ADDRESS: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            DTI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PPA_NO: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PPA: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            SHOW_COMPNAME: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblCompany;
};
