const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");



class Category extends Model {
    static id;
    static name;
    static description;
    static image;
    static status;
}

Category.init({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'Category',
});

Category.prototype.toJSON = function () {
    return this.get();
};

module.exports = Category;