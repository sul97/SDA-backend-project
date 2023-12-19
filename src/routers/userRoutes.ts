import { Router } from 'express'

import {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  processRegisterUserController,
  activateUser,
  banUser,
  unbanUser,
  forgetPassword,
  resetPassword,
} from '../controllers/userControllers'
import { uploadUsersimage } from '../middlewares/uploadFile'
import { userRegistrationValidator } from '../validation/userValidation'
import { runValidation } from '../validation/runValidation'
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth'

const userRoutes = Router()

// userRoutes.post(
//   '/process-register',
//   uploadUsersimage.single('image'),
//   isLoggedOut,
//   userRegistrationValidator,
//   runValidation,
//   processRegisterUserController
// )
// userRoutes.post('/activate', isLoggedOut, activateUser)
// userRoutes.put('/ban/:id', isLoggedIn, isAdmin, banUser)
// userRoutes.put('/unban/:id', isLoggedIn, isAdmin, unbanUser)
// userRoutes.get('/', isLoggedIn, isAdmin, getAllUsers)
// userRoutes.get('/:id', isLoggedIn, getSingleUser)
// userRoutes.put('/:id', uploadUsersimage.single('image'), updateSingleUser)
// userRoutes.delete('/:id', isLoggedIn, isAdmin, deleteSingleUser)
// userRoutes.post('/forget-password', isLoggedOut, forgetPassword)
// userRoutes.post('/reset-password', isLoggedOut, resetPassword)



userRoutes.post(
  '/process-register',
  uploadUsersimage.single('image'),
  processRegisterUserController
)
userRoutes.post('/activate', activateUser)
userRoutes.put('/ban/:id', banUser)
userRoutes.put('/unban/:id', unbanUser)
userRoutes.get('/', isLoggedIn, isAdmin, getAllUsers)
userRoutes.get('/:id', getSingleUser)
userRoutes.put('/:id',updateSingleUser)
userRoutes.delete('/:id', deleteSingleUser)
userRoutes.post('/forget-password', forgetPassword)
userRoutes.post('/reset-password', resetPassword)

export default userRoutes
