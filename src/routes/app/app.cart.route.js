import { Router } from "express";
import CartsManager from "../../managers/CartsManager.js";

const router = Router();
const cartsManager = new CartsManager();

router.get("/:cid", async (req, res) => {
    const {cid} = req.params;

    if(!cid){
        return res.status(400).send({"error": "Faltan datos."});
    }

    try {
        const cart = await cartsManager.getCartById(cid);
        res.render("cart", {cart: cart.toObject()});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

export default router;