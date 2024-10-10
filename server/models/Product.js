const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  seed: {
    type: Boolean,
  },  
  productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageProduct: [
      {
        type: String,
        required: true,
      }
    ],
    productImgUrl: {
      type: String,
    },
    productPrice: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      required: true,
    }
  },  
  {
    toJSON: {
      getters: true,
    },
  }
);

const Product = model('Product', productSchema);

module.exports = Product;