import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { dev } from '../config'
import { UsersType } from '../types'


const userSchema = new Schema<UsersType>(
  {
    name: {
      type: String,
      required: [true, 'please Enter the name'],
      trim: true,
      minlength: [3, ' name at least 3 character'],
      maxlength: [30, ' name at most 30 charchter'],
    },
    email: {
      type: String,
      required: [true, 'please Enter the email'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        message: 'Please Enter valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'please Enter the password'],
      trim: true,
      minlength: [6, 'password at least 6 character'],
      set: (password: string) => bcrypt.hashSync(password, 10),
    },
    image: {
      type: String,
      default: dev.app.defaultImagePath,
    },
    address: {
      type: String,
      required: [true, 'please Enter the address'],
      trim: true,
      minlength: [3, ' address at least 3 character'],
    },
    phone: {
      type: String,
      required: [true, 'please Enter the phone'],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    // role: {
    //   type: String,
    //   trim: true,
    //   required: true,
    // },
    // order: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Order',
    // },
  },
  { timestamps: true }
)

//name of schema in mongo (products , users)
const User = model<UsersType>('users', userSchema)
export default User
