import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName
    });
    return { public_id: result.public_id, secure_url: result.secure_url }
  }
  catch (error) {
    throw new Error(error)
  }
}
const deleteImageFromCloudinary = async (public_id) => {
  try {
    return await cloudinary.uploader.destroy(public_id)
  }
  catch (error) {
    throw new Error(error)
  }
}
const uploadImageFromUrl = async (url, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: folderName
    });
    return { public_id: result.public_id, secure_url: result.secure_url }
  }
  catch (error) {
    throw new Error(error)
  }
}
export { uploadImageOnCloudinary, uploadImageFromUrl, deleteImageFromCloudinary }
