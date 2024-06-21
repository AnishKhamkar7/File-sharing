import { Router } from "express";
import multer from "multer";
import {File} from "../models/file.models.js"
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage, 
    limits: { fileSize: 1000000 * 100},
  }).single('files');

const router = Router()

router.post('/',(req, res) =>{
   
    //store file

    upload(req, res, async (err) =>{
         //validate req

        if (!req.file) {
            return res.json({error: "All fields are required"});
            
        }
        if(err){
            return req.statusCode(500).send({ error: err.message})
        }
        
    //store into database
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size,
        });

        const response = await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});

        //http://localhost:8000/files/43528hieus-34t224nt2-2t2
     
    });




    //responsee -->  link
})


export default router