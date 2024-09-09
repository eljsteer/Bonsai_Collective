const { Schema, model, mongoose } = require("mongoose");

const cartSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  }, 
);

const Cart = model('Cart', cartSchema);

module.exports = Cart;