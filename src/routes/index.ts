import {Router ,Request , Response  } from "express"
import  * as AuthController  from "../controllers/AuthController "
import  * as taskListController  from "../controllers/taskListController"
import {routePrivate} from "../middlewares/Auth"

const router = Router()

router.get("/ping" , (req : Request , res: Response ) =>{
res.json({pong : true})
})

router.get("/" , routePrivate, (req : Request , res: Response ) =>{
    res.render("taskList")
    })

router.get("/cadastro" , AuthController.showRegistreForm)
router.post("/cadastro" , AuthController.registre)

router.get("/login" , AuthController.showLoginForm)
router.post("/login" , AuthController.login)

router.get("/Lista_tarefa" ,routePrivate, (req : Request , res: Response ) =>{
res.render("taskList")
})

router.post("/Lista_tarefa" ,taskListController.saveTask )

router.delete("/Lista_tarefa" ,taskListController.deleteTask )

router.get("/logout" , AuthController.logout)
export default router 