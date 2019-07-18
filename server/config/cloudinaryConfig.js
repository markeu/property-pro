import { config, uploader } from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();
const cloudinaryConfig = (req, res, next) => {
	config({
		cloud_name: 'uchay',
		api_key: 526356814826735,
		api_secret: 'mEfdFc35cNJ52bkQVHPWiGl7VQw',  
	});
	next();
};
export { cloudinaryConfig, uploader };