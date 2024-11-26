// using promise for wrapper at place of try catch


const asyncHandler = (requestHandler) =>{
   (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(EvalError))
   }
}
export{asyncHandler}


// const asyncHandler=()=>{}
// const asyncHandler=(func)=>{()=>{}}
// const asyncHandler=(func)=> async () =>{}


//  using try catch process of wrapper funtion 

// const asyncHandler = (fn)=> async (req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(err.code|| 500).json({
//             success : false,
//             message: err.message
//         })
//     }
// }