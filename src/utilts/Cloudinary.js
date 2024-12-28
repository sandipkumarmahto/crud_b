import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary= async (localFilePath) =>{
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.Cloudinary_CLOUD_NAME, 
        api_key: process.env.Cloudinary_API_KEY, 
        api_secret: process.env.Cloudinary_API_SECRET
    });
    

    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {resource_type:"auto"})
    .catch((error) => {
        console.log(error);
        fs.unlinkSync(localFilePath) //remove the locally saved fule as the upload operation got failed
        return null;
    });
    
    return uploadResult;

}

export { uploadOnCloudinary };


// (async function() {
 
//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'ddojnr1zn', 
//         api_key: '878683171669146', 
//         api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();