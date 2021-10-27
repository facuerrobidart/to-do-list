module.exports = (sequelize, DataTypes) => {
    let alias = "notas";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        folder_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        checked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
}