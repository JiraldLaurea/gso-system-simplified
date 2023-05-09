module.exports = (sequelize, DataTypes) => {
    const tblUserType = sequelize.define(
        "tblUserType",
        {
            usertype_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            usertype: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblUserType;
};
