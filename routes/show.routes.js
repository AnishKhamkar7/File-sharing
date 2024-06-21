import { Router } from "express";
import { File } from "../models/file.models.js";

const router = Router()


router.get("/:uuid", async (req,res) => {

    try {
        const filefetch =  await File.findOne({ uuid: req.params.uuid});

        if(!filefetch){
            return res.render('download', {
                error: 'Link has been expired'
            })
            
        }
        return res.render('download',{
            uuid: filefetch.uuid,
            filename: filefetch.filename,
            filesize: filefetch.filesize,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${filefetch.uuid}`
            // http://localhost:8000/files/download/dkhbwiu83-n38bcGVui
        })
        
    } catch (error) {

        return res.render('download', {
            error: 'Something wewnt wrong'
        })
        
    }
    

}) 

export default router
