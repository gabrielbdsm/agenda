import {Router ,Request , Response  } from "express"
import  * as AuthController  from "../controllers/AuthController "
const router = Router()

router.get("/ping" , (req : Request , res: Response ) =>{
    res.json({pong : true})
})

router.get("/cadastro" , AuthController.showRegistreForm)
router.post("/cadastro" , AuthController.registre)

router.get("/login" , AuthController.showLoginForm)
router.post("/login" , AuthController.login)

router.get("/agenda" , (req : Request , res: Response ) =>{
    res.json({agenda : true})
})
export default router 