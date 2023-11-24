import multer from 'multer'

const userStorge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

export const uploadusers = multer({ storage: userStorge })
