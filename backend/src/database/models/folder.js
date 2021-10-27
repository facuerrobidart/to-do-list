module.exports = (sequelize, DataTypes) => {
    let alias = "folders";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { 
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        users_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }

    let config = {
        tableName: "folders",
        timestamps: false,
    };

    const Folder = sequelize.define(alias,cols,config);

    Folder.associate = (models) => {
        Folder.hasMany(models.notes,{
            as:"notes",
            foreignKey: "folders_id"
        });

        Folder.belongsTo(models.users,{
            as: "users",
            foreignKey: "users_id"
        });
    }

    return Folder;
}