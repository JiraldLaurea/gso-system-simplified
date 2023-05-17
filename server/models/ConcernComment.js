module.exports = (sequelize, DataTypes) => {
    const ConcernComment = sequelize.define(
        "ConcernComment",
        {
            commentText: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            barangayName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            concernId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return ConcernComment;
};
