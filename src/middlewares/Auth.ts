import { Request , Response ,NextFunction} from "express";
import UserModel  from "../models/User"
import JWT from 'jsonwebtoken'

type TokenPayload = {
    id: string;
    username: string;

}

export const routePrivate = async (req: Request , res:Response ,next : NextFunction)=>{
    const token = req.cookies.token
    
    if (!token) {
        res.redirect("login");
        return;
    }
    let  decoded : TokenPayload  | string;
    try {
        decoded  = JWT.verify(token,  process.env.SECRETKEY as string)  as TokenPayload
        const user =await UserModel.findById(decoded.id )
        if(!user){
            res.redirect("login");
            return
        }
        } catch (err) {
            res.redirect("login");
            return
        }

    next();
}