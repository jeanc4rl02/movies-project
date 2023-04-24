import {v2 as cloudinary} from 'cloudinary';
import {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from './env.config.js';

// Configuration 
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  });
  
// Function to upload an image
export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'Cinema'
    })
}

// Function to delete an image
export const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId)
}