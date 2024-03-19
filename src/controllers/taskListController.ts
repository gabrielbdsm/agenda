import { Request, Response } from "express"
import JWT , { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';
import UserModel  from "../models/User"
import taskListModel  from "../models/taskList"

type TokenPayload = {
    id: string;
    username: string;

}

dotenv.config();

export const saveTask = async(req:Request , res:Response)=>{
    const {description , time} = req.body
    const token = req.headers.authorization?.split(" ")[1]
    
    
    if (!token) {
        res.status(401).json({ err: 'Token não fornecido' });
        return;
    }
    let  decoded : TokenPayload  | string;
    try {
        decoded  = JWT.verify(token,  process.env.SECRETKEY as string)  as TokenPayload
        
        } catch (err) {
            res.json({ err: 'token invalido' });
            return
        }
    
    const user =await UserModel.findById(decoded.id )
    if(!user){
        res.json({ message: false});
        return
    }else{
        const newTask = new taskListModel({
            id_user : decoded.id,
            date : time,
            task : description
        })
        await newTask.save().then((savedTask) => {
            res.json({ message: true , taskId: savedTask._id}) 
            return
        })
        .catch((err: Error) => {
            res.status(500).json({ err: err  , message: false });
            return
        });
    }
    
    return
    
    
}


export const deleteTask =  async(req:Request , res:Response)=>{
    const {taskId } = req.body
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        res.status(401).json({ err: 'Token não fornecido' });
        return;
    }
    let  decoded : TokenPayload  | string;
    try {
        decoded  = JWT.verify(token,  process.env.SECRETKEY as string)  as TokenPayload
        
        } catch (err) {
            res.json({ err: 'token invalido' });
            return
        }
        await taskListModel.deleteOne({_id : taskId} )
}