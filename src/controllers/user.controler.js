import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";



const registerUser= asyncHandler( async(req,res)=>{
    // for practice purpose  example
    // res.status(200).json({
    //     message: "Chai or MsCode"
    // })


   // get details from user
   const {fullname, email,username,password}=req.body
   console.log("email : ",email);

   // validation 
   
   // using simple way 
   //    if(fullname===""){
   //      throw new ApiError(400,"fullname is required")
   //    }
   //    if(username===""){
   //     throw new ApiError(400,"fullname is required")
   //   }
   //   if(password===""){
   //     throw new ApiError(400,"fullname is required")
   //   }

   //    another effficent way 

   if(
    [fullname, email, username, password].some((field)=>
    field.trim()==="")
   ){
    throw new ApiError(400, "all field are required")
   }

   // check exist or not

   const existedUser = User.findOne({
      $or:[{ username } , { email }]
   })
   if(existedUser){
      throw new ApiError(409, "username or email already exist")
   }

   if(!avatarLocalPath){
      throw new ApiError(400, "Avatar file is required")
   }
   
   // file avatar are uploaded or not

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0].path;
   
   // upload on cloudinary

   const avatar =await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
   
   if(!avatar){
      throw new ApiError(400, "Avatar file is required")
   }

   //entry in database
   const user = await User.create({
      fullname,
      avatar:avatar.url,
      coverImage:coverImage?.url|| "",
      email,
      password,
      username: username.toLowerCase()
   })
   const createdUser= await User.findById(user._id).select(
      "-password -refreshToken"
   )

   // check user created or not
   if(!createdUser){
      throw new ApiError(500, "Something went wrong while registering the user ")
   }

   // return response
   return res.status(201).json(
      new ApiResponse(200 , createdUser, "User register successfully")
   )

})

export {registerUser}


   // Step for controler for regiter user

   //get user details from fronted 
   //validation of data - not empty
   //check user already exist or not
   //check for images and files avatar and other type of files
   //upload them to cloudinary,check avator 
   //create user object - create entry in db (for mongodb)
   //remove password and refresh token field from response
   //check for user creation 
   //return response 
   