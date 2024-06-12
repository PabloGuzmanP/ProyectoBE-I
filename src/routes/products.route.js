import {Router} from "express";
import products from "../product.js";

const router = Router();

router.get("/", async (req, res) => {
    const { limit } = req.query;
    const lim = Number(limit);

    const productList = await products.getProducts(lim)

    res.render("home", {productList})
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const idProduct = Number(id);

    res.status(200).send({status: "success", data: await products.getProductsById(idProduct)});
});

router.post("/", async (req, res) => {
    const {title, description, code, price, stock, category, thumbnails} = req.body;

    if(!title || !description || !code || !price || !stock || !category || !thumbnails){
        return res.status(400).send({"error": "Faltan datos."});
    };

    const newProduct = await products.addProduct(title, description, code, Number(price), Number(stock), category, thumbnails);

    res.status(200).send({message: "Producto agregado.", data: newProduct});
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const updateFields= req.body;

    const updateProduct = await products.updateProduct(Number(id), updateFields)

    if(!updateFields){
        res.status(404).send({ error: "Producto no encontrado" });
    } else {
        res.status(200).send({ message: "Producto actualizado correctamente.",data: updateProduct });
    }
    
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const idProduct = Number(id);

    res.status(200).send({status: "success", data: await products.deleteProduct(idProduct)});
})

export default router;