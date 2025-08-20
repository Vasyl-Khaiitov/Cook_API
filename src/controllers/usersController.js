import { getUserService } from "../services/usersServices.js";

export async function getUserInfoController(req,res,next){
    const userInfo = await getUserService(req.user.id);
    return  res.json({
    status:200,
    message: "User Info got successfully",
    data:{
        info:userInfo,
    }
   });

}