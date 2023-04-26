import { uploadImage } from "../config/cloudinary.config.js";

export const RESPONSE = Object.freeze({
    OK: 'Successful request',
    NO_CINEMA: 'At the moment we have no objects to show. Please create one before using this request.',
    NO_DATA_ID: `At the moment we have no item with that id to show. Please make sure that the provided id exists in the database.`,
    NO_DATA: 'No data',
    EMPTY: `Propertie logo cannot be empty.`,
    DELETE_OK: `The item was successfully deleted.`
})

export const response = (code, message, body = 'No data', res) => {
    return res.status(code).json({
        message: message,
        body: body
    })
}

export const uploadToCloudinary = async (isAnyFile, pathToUpload) => {
    try {
        if(isAnyFile){
            const result = await uploadImage(pathToUpload);
            return {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
        }
    } catch (error) {
        console.log(error);
    }
}

