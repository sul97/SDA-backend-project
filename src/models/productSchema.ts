import mongoose, { Schema, model } from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'product title at least 3 character'],
      maxlength: [50, 'product title at most 50 character'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      minlength: [1, 'can not be zero'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      default: [],
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'product description at least 3 character'],
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
      minlength: [1, 'can not be zero'],
    },
    sold: {
      type: Number,
      required: true,
      trim: true,
      minlength: [1, 'can not be zero'],
    },
    shipping: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export const Product = model('products', productSchema)