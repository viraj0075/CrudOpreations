import { Router } from "express";
import { createUser,getUser,getUserById,updateUser,deleteUser} from "../controllers/user.controller.js";

const routers = Router();

routers.post("/create",createUser);
routers.get("/getuser",getUser)
routers.get("/getuserbyid/:id",getUserById)
routers.put("/updateuser/:id",updateUser)
routers.delete("/deleteuser/:id",deleteUser)
export default routers;