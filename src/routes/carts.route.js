import { Router } from "express";
import carts from "../cart.js";
import CartsManager from "../managers/CartsManager.js";


const router = Router();
const cartsManager = new CartsManager();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const idCart = Number(id);

    res.status(200).send({status: "success", data: await carts.getCartById(idCart)});
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if(!quantity){
        return res.status(400).send({"error": "Faltan datos."});
    };

    const newProduct = await carts.addProductToCart(Number(cid), Number(pid), Number(quantity));

    res.status(200).send({message: "Producto agregado", data: newProduct});
});

router.post("/", async (req, res) => {
    const newCart = await carts.addCart()

    res.status(200).send({message:"Carrito agregado", data: newCart})
})

// ------------------------------ MONGO ---------------------------------------------------------
router.get("/mongo", async (req, res) => {
    try {
        const cartsFound = await cartsManager.getAll();
        res.status(200).json({ status: true, payload: cartsFound});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

// CREAR UN NUEVO CARRITO
router.post("/mongo", async (req, res) => {
    try {
        const newCart = await cartsManager.insertOne();
        res.status(200).send({message:"Carrito agregado", payload: newCart})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
});
// INSERTAR UNA CANTIDAD DE UN PRODUCTO A UN CARRITO
router.post("/mongo/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    const {quantity} = req.body;

    if(!quantity) {
        return res.status(400).send({"error": "Faltan datos."});
    }

    try {
        const newProduct = await cartsManager.addProductToCart(cid, pid, Number(quantity));
        res.status(200).send({message: "Producto agregado", payload: newProduct});
    } catch (error) {
        throw new Error(error.message);
    }
});



export default router;