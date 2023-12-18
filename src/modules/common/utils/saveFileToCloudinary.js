const fs = require('node:fs/promises');
const cloudinary = require('cloudinary');
const path = require('node:path');
const {
  CLOUDINARY_CLOUD,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require('../constants/env');

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const saveFileToCloudinary = async (file) => {
  const res = await cloudinary.v2.uploader.upload(file.path, {
    public_id: file.filename,
  });

  await fs.unlink(file.path);
  return res.url;
};

module.exports = saveFileToCloudinary;
