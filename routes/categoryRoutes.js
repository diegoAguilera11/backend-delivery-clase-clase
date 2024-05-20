const { Router } = require("express");

const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const checkAdmin = require("../middlewares/check-admin");

const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoriesController");




const router = Router();


// Create a category
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateJWT,
    checkAdmin,
    validateFields
], createCategory);


// Get all categories
router.get('/', [
    validateJWT,
    validateFields
], getCategories);


// Update category
router.put('/:id', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    validateJWT,
    checkAdmin,
    validateFields
], updateCategory);


// Delete category
router.delete('/:id', [
    validateJWT,
    checkAdmin,
    validateFields
], deleteCategory);

module.exports = router;