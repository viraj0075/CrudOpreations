import express from "express";
const app = express();
import dotenv from "dotenv";
import MongoDBConnect from "./db/index.js";
import routers from "./routes/user.routes.js";
import cors from "cors";

dotenv.config({
    path:"./env"
})

app.use(express.json());
app.use(cors());
app.use("/api",routers);

MongoDBConnect().then(() => {
    app.listen(process.env.PORT || 8000,() => {
        console.log(`Server is Listing on the Port ${process.env.PORT}`)
    })
})