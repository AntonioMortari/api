const multer = require('multer')
const uuid = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'))
    },

    filename: (req,file,cb) =>{
        cb(null, uuid.v4() + '-' + file.originalname)
    }
})

const fileFilter = (req,file,cb) =>{
    const allowedExtensions = ['.png', '.jpg', '.webp']
    const fileExtension = path.extname(file.originalname)

    if(allowedExtensions.includes(fileExtension)){
        return cb(null,true)
    }else{
        return cb(null,false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 2 * 1024 * 1024
    }
})

module.exports = upload