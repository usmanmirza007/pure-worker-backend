import multer from "multer"
import path from "path"

const allowedFileTypes =
    [
        "image/png",
        "image/jpg",
        "image/jpeg",
    ]

var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        const destination = path.join(__dirname, "../uploads")
        cb(null, destination)
    },
    filename: (req: any, file: any, cb: any) => {
        const ext = file.mimetype.split('/')[1]
        // cb(null, `${new Date().getTime()}-${file.originalname}`)
        cb(null, `${new Date().getTime()}.${ext}`)
    }
})

const uploadFilter = function (req: any, file: any, cb: any) {
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Invalid file'));
    }
}


export default multer({
    storage: storage,
    fileFilter: uploadFilter,
})