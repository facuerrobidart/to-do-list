module.exports = (sequelize, DataTypes) => {
    let alias = "users";

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: { 
            type: DataTypes.STRING(30),
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull:false
        }
    }

    let config = {
        tableName: "users",
        timestamps: false,
    };

    const User = sequelize.define(alias,cols,config);

    User.associate = (models) => {
        User.hasMany(models.notes,{
            as:"notes",
            foreignKey: "users_id"
        });

        User.hasMany(models.folders,{
            as: "folders",
            foreignKey: "users_id"
        });
    }

    return User;
}