const Image = require('../models/Image');
const uploadToCloudinary = require('../helpers/cloudinary-helper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded. Please select an image to upload.",
        });
      }
      const filePath = req.file.path;

      console.log("File received locally. Starting upload to Cloudinary...");
      console.time("cloudinary-upload"); // Start a timer

      const { url, publicId } = await uploadToCloudinary(filePath);

      console.timeEnd("cloudinary-upload"); // End the timer and see how long it took
      console.log("Successfully uploaded to Cloudinary. Saving to database...");

      const imageToDB = await Image.create({
        url,
        publicId,
        uploadedBy: req.userInfo.userId,
    });
    if (!imageToDB) {
        return res.status(401).json({
            success: false,
            message: "Uploading image details failed, please try again",
        });
    }

    res.status(201).json({
        success: true,
        message: "Image has been uploaded successfully",
        image: imageToDB,
    });

    // delete file from local memory
    fs.unlinkSync(req.file.path);

    } catch(e) {
        console.error("Error: ", e);
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
}

const fetchImageController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {}
        sortObj[sortBy] = sortOrder;

        const allImages =  await Image.find().sort(sortObj).skip(skip).limit(limit);
        if(!allImages) {
            return res.status(404).json({
                success : false,
                message : 'No image found'
            })
        }
        res.status(201).json({
            success : true,
            currentPage : page,
            totalPages,
            totalImages,
            message : 'Successfully fetched all images',
            images : allImages
        })
    } catch(e) {
        console.error("Error", e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong, try again later'
        })
    }
}

const deleteImageController = async (req, res) => {
    try {
        const currentImageID = req.params.id;

        //get details of the image by id from req params
        const currentImageDetails = await Image.findById(currentImageID);

        if (!currentImageDetails) {
        return res.status(404).json({
            success: false,
            message: "The image you are trying to delete is not found",
        });
        }

        const userId = req.userInfo.userId;

        // check if the user who is trying to delete the image uploaded it
        if (userId !== currentImageDetails.uploadedBy.toString()) {
        return res.status(403).json({
            success: false,

            message: "You are not permitted to delete this image",
        });
        }

        // first delete image from cloudinary
        await cloudinary.uploader.destroy(currentImageDetails.publicId);

        // secondly delete image from mongoDB
        const deletedImage = await Image.findByIdAndDelete(currentImageID);

        res.status(200).json({
        success: true,
        message: "Image deleted successfully",
        deletedImage,
        });
    } catch (e) {
    console.error("Error", e);
    res.status(500).json({
        success: false,
        message: "Something went wrong, try again later",
        });
    }
};

module.exports = { uploadImageController, fetchImageController, deleteImageController};