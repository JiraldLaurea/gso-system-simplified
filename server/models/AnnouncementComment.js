module.exports = (sequelize, DataTypes) => {
    const AnnouncementComment = sequelize.define(
        "AnnouncementComment",
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
            announcementId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );
    return AnnouncementComment;
};
