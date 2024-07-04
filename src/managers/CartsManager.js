import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

export default class CartsManager {
    #cartModel;

    constructor(){
        this.#cartModel = CartModel;
    }

    getAll = async () => {
        try {
            const carts = await this.#cartModel.find();
            return carts;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async () => {
        try {
            const newCart = new this.#cartModel({products: []});
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    addProductToCart  = async (cid, pid, quantity) => {
        try {
            const cart = await this.#cartModel.findById(cid);
            if(!cart){
                throw new Error("Carrito no encontrado");
            }

            const product = await ProductModel.findById(pid);
            if(!product){
                throw new Error("Producto no encontrado");
            }

            const productIndex = cart.products.findIndex(p => p.productId.toString() === pid);
            if(productIndex !== -1){
                cart.products[productIndex].quantity += quantity;
            }else {
                cart.products.push({productId: pid, quantity: quantity});
            }

            const updatedCart = await cart.save();
            return updatedCart;

        } catch (error) {
            throw new Error(error.message);
        }
    };

    deleteCart = async (cid) => {
        try {
            const deletedCart = await this.#cartModel.findByIdAndDelete(cid);
            if (!deletedCart) {
                throw new Error("Carrito no encontrado");
            }
            return deletedCart;
        } catch (error) {
            throw new Error (error.message);
        }
    };

    deleteProductOfCart = async (cid, pid) => {
        try {
            const cart = await this.#cartModel.findById(cid);
            if(!cart){
                throw new Error("Carrito no encontrado");
            }
            const productIndex = cart.products.findIndex(p => p.productId.toString() === pid.toString());
            if(productIndex === -1){
                throw new Error ("Producto no encontrado en carrito");
            }
            
            cart.products.splice(productIndex, 1);

            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}