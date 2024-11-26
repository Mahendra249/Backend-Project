// require("dotenv").config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

 











// First Approch 
// const app = express();
// (async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",()=>{
//         console.log("ERR:", error);
//         throw error
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`app is litening on port ${process.env.PORT}`);
//        })

//     }catch(error){
//         console.log("ERROR:",error);
//         throw error
//     }
// })()