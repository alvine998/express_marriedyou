const multer = require('multer');
const fs = require('fs');

module.exports = (app) => {
    const Storage = multer.diskStorage({
        destination(req,file,cb){
            cb(null, "resources/upload/");
        },
        filename(req,file,cb){
            cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
        },
    });

    const upload = multer({storage: Storage});

    app.post("/uploads", upload.single("image"), (req,res) => {
        console.log("body", req.body)
        res.status(200).send({
            message: "success",
            info: req.file.filename,
        });
    });

    app.delete("/delete/:imageName", (req,res) => {
        if (!req.params) {
            return res.status(500).json({
              message: "params undefined",
            });
        } else {
            const fileExist = fs.existsSync(`resources/upload/${req.params.imageName}`);
            if(fileExist){
                fs.unlink(`resources/upload/${req.params.imageName}`);
                res.status(200).send({ message: "file dihapus" });
            } else {
                res.status(404).json({ message: "file doesnt exist" });
            }
        }
    })
}