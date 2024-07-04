import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const orderProductSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'products', required: true},
    quantity: {type: Number, required: true}
},{ _id: false });

const cartSchema = new Schema ({
    products: [{type: orderProductSchema, required: true}]
});

cartSchema.plugin(mongoosePaginate);

const CartModel = model("carts", cartSchema);

export default CartModel;