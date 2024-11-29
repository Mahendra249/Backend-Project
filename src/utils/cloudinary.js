import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dcpznmiiq', 
        api_key: '617629677917897', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
    const uploadOnCloudinary = async (localFilePath)=>{
        try{
            if(!localFilePath) return null
            const response = await cloudinary.uploader
            .upload(localFilePath, {
                resource_type: "auto"
            })
            // file has been uploaded  successfull
            console.log("file is uploaded on cloudinary",response.url);
            return response;

        } catch(error){
            fs.unlindSync(localFilePath) // remove thelocally saved temporary file as the upload operation got fail  
        }
    }
  
})();