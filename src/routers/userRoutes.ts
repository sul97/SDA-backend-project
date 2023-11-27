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
} from '../controllers/userControllers'
import { uploadUsersimage } from '../middlewares/uploadFile'
import { userRegistrationValidator } from '../validation/userValidation'
import { runValidation } from '../validation/runValidation'

const userRoutes = Router()

userRoutes.post(
  '/process-register',
  uploadUsersimage.single('image'),
  userRegistrationValidator,
  runValidation,
  processRegisterUserController
)
userRoutes.post('/activate', activateUser)

userRoutes.get('/', getAllUsers)
userRoutes.get('/:id', getSingleUser)
userRoutes.put('/:id', uploadUsersimage.single('image'), updateSingleUser)
userRoutes.delete('/:id', deleteSingleUser)

userRoutes.put('/ban/:id', banUser)
userRoutes.put('/unban/:id', unbanUser)

export default userRoutes
