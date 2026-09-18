const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');

async function uploadProductImage(file) {
  const driver = process.env.STORAGE_DRIVER || 'local';
  if (driver === 'cloudinary') return uploadToCloudinary(file);
  if (driver !== 'local') throw new Error(`Unsupported STORAGE_DRIVER: ${driver}`);
  const extension = (file.mimetype.split('/')[1] || 'jpg').replace(/[^a-z0-9]/gi, '');
  const name = `${crypto.randomUUID()}.${extension}`;
  const directory = path.join(__dirname, '..', 'public', 'uploads');
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, name), file.buffer);
  return `/uploads/${name}`;
}

function uploadToCloudinary(file) {
  const cloudinary = require('cloudinary').v2;
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw new Error('Cloudinary credentials are required when STORAGE_DRIVER=cloudinary.');
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });
  return new Promise((resolve, reject) => { const stream = cloudinary.uploader.upload_stream({ folder: process.env.CLOUDINARY_FOLDER || 'menu-dark/products', resource_type: 'image' }, (error, result) => error ? reject(error) : resolve(result.secure_url)); stream.end(file.buffer); });
}
module.exports = { uploadProductImage };
