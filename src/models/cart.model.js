import { Schema, model } from "mongoose";

const orderProductSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: {type: Number, required: true}
});

const cartSchema = new Schema ({
    products: [{type: orderProductSchema, required: true}]
});

const CartModel = model("carts", cartSchema);

export default CartModel;