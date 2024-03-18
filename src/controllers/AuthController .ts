import { Request , Response } from "express"
import UserModel  from "../models/User"
import {registreValidator} from "../validators/AuthValidator"
import bcrypt from "bcrypt"



export  const showRegistreForm = async(req : Request , res: Response)=>{
    res.render("registre")
}

export  const registre = async(req : Request , res: Response)=>{
    const user = req.body

    if(!user){
        res.status(400).render("registre",{ user:  "formulario não enviado"})
        return
    }

    const {username , email, password , ConfirmPassword} = user

    try {
        const existingUsername = await UserModel.findOne({username});
        if(existingUsername){
            res.status(400).render("registre",{  userError:"Usuário já cadastrado"})
            return
            }
    } catch (err) {
        res.status(500).render("registre",{userError:"Erro interno do servidor"})
        return
    }
    
    try {
        const existingEmail = await UserModel.findOne({email});
        if(existingEmail){
            res.status(400).render("registre",{  emailError:"Email já cadastrado"})
            return
            }
    } catch (err) {
        res.status(500).render("registre",{  emailError:"Erro interno do servidor"})
        return
    }

    const errors = await registreValidator(username , email, password , ConfirmPassword)
    if (Object.keys(errors).length > 0 && errors != false){
        console.log(errors)
        res.status(400).render("registre", {passwordError : errors.password , emailError : errors.email})
        return
    }
    
    const passwordHash = await bcrypt.hash(password , 10)
    const newUser = new UserModel({
        username : username,
        email : email,
        password : passwordHash
    })
    await newUser.save().then(() => {
        res.status(200).redirect("login");
    })
    .catch((err: Error) => {
        res.status(500).json({ err: err });
    });
    
    
}