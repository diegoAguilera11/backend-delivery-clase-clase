const { DataTypes, Model } = require("sequelize");
const db = require("../database/connection");

class Role extends Model {
    static id;
    static name;
}

Role.init({
    name: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: db,
    modelName: 'Role',
});

module.exports = Role;