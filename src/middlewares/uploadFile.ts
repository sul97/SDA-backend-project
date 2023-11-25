import multer from 'multer'

const ProductsStorge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})




const userStorge = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

export const uploadProductimage = multer({ storage: ProductsStorge })
export const uploadusers = multer({ storage: userStorge })
