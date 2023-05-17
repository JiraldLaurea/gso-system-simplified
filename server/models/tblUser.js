module.exports = (sequelize, DataTypes) => {
    const tblUser = sequelize.define(
        "tblUser",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            usertype_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            initial: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return tblUser;
};
