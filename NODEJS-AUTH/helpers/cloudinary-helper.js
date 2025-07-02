const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        
        return {
            url : result.secure_url,
            publicId : result.public_id
        }
    } catch(e) {
        console.error("Upload to cloudinary failed", e);
        throw new Error('Upload to cloudinary failed');
    }
}

module.exports = uploadToCloudinary;