const Router = require("express");
const carts = require("../cart");


const router = Router();

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

module.exports = router;