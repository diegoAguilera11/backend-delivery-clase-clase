const { request, response } = require("express");
const Category = require("../models/category");




const createCategory = async (req = request, res = response) => {
    try {
        const { name, description } = req.body;

        const categoryData = {
            name: name.toUpperCase(),
            description,
        }

        // Exist category
        const existCategory = await Category.findOne({
            where: {
                name: categoryData.name
            }
        });

        if (existCategory) {
            return res.status(400).json({
                success: false,
                msg: 'Category already exist'
            });
        }

        const category = await Category.create(categoryData);

        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
            msg: 'Error in server'
        });
    }
}


const getCategories = async (req = request, res = response) => {
    try {
        const categories = await Category.findAll({ where: { status: true } });


        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                data: [],
                msg: 'Categories not found'
            });
        }


        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            error,
            msg: 'Error in server'
        });
    }

}


const updateCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const { name, description } = req.body;

        const responseUpdateCategory = await Category.update({ name: name.toUpperCase(), description }, { where: { id } });

        if (responseUpdateCategory[0] === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Category not found'
            });
        }

        const updateCategory = await Category.findOne({ where: { name } });

        res.status(201).json({
            success: true,
            data: updateCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
            msg: 'Error in server'
        });
    }
}

const deleteCategory = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        const responseDeleteCategory = await Category.update({ status: false }, { where: { id } });

        if (responseDeleteCategory[0] === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Category not found'
            });
        }
        const deleteCategory = await Category.findByPk(id);

        res.status(200).json({
            success: true,
            data: deleteCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
            msg: 'Error in server'
        });
    }
}



module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}