const { Schema, model } = require("mongoose");

const productSchema = new Schema({
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
    price: {
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