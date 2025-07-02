const Image = require('../models/Image');
const uploadToCloudinary = require('../helpers/cloudinary-helper');
const fs = require('fs');

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
        const allImages =  await Image.find({});
        if(!allImages) {
            return res.status(404).json({
                success : false,
                message : 'No image found'
            })
        }
        res.status(201).json({
            success : true,
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

module.exports = { uploadImageController, fetchImageController};