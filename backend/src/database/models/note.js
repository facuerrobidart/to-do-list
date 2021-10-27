module.exports = (sequelize, DataTypes) => {
    let alias = "notas";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        folders_id: {
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

    let config = {
        tableName: "notes",
        timestamps: false,
    };

    const Note = sequelize.define(alias,cols,config);

    Note.associate = (models) => {
        Note.belongsTo(models.folders,{
            as:"folders",
            foreignKey: "folders_id"
        });

        Note.belongsTo(models.users,{
            as: "users",
            foreignKey: "users_id"
        });
    }

    return Note;
}