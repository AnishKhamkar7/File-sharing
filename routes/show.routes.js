import { Router } from "express";
import { File } from "../models/file.models";

const router = Router()


router.get(":uuid", async (req,res) => {

    try {
        const filefetch =  await File.findOne({ uuid: req.params.uuid});
        
    } catch (error) {

        return res.render("download")
        
    }
    

}) 

export default router
