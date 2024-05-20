const { response, request } = require("express");

const User = require("../models/user");
const Category = require("../models/category");

const cloudinary = require('cloudinary').v2;


const updateImageCloudinary = async (req = request, res = response) => {
    try {
        const { collection, id } = req.params;
        let model;

        switch (collection) {
            case 'users':
                model = await User.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'User not exist'
                    });
                }
                break;
            case 'categories':
                model = await Category.findByPk(id);
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'Category not exist'
                    });
                }
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });
        }

        // Clean previous image
        if (model.image) {
            const nameImageArray = model.image.split('/');

            const nameImage = nameImageArray[nameImageArray.length - 1];
            const [public_image_id] = nameImage.split('.');
            console.log(public_image_id);

            cloudinary.uploader.destroy(`AppDelivery365/${collection}/${public_image_id}`);
        }

        // Extract temporal image
        const { tempFilePath } = req.files.archive;
        console.log(tempFilePath);

        // upload to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: `AppDelivery365/${collection}`
        });

        // Update image to user
        model.image = secure_url;
        await model.save();

        res.status(201).json({
            success: true,
            data: model.image
        });
    } catch (error) {

    }
}





module.exports = {
    updateImageCloudinary
}