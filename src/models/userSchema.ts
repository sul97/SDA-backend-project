import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'first name at least 3 character'],
    maxlength: [30, 'first name at most 30 charchter'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'last name at least 3 character'],
    maxlength: [30, 'last name at most 30 charchter'],
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: Number,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
})

//name of schema in mongo (products , users)
export const User = model("users", userSchema);
