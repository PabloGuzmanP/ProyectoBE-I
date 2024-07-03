import {Router} from "express";
import products from "../product.js";
import serverSocket from "../config/socket.config.js";
import ProductsManager from "../managers/ProductsManager.js";

const router = Router();
const socket = serverSocket.config();
const productsManager = new ProductsManager();

router.get("/mongo", async (req, res) => {
    const { limit = 10, page = 1, query, sort } = req.query;

    try {
        const parsedSort = sort ? JSON.parse(sort) : undefined;
        const parsedQuery = query ? JSON.parse(query) : {};

        const productsFound = await productsManager.getAll(limit, page, parsedQuery, parsedSort);

        res.status(200).json({ status: true, payload: productsFound });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get("/", async (req, res) => {
    const { limit } = req.query;
    const lim = Number(limit);

    const productList = await products.getProducts(lim)

    res.render("home", {productList});
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

    try {
        const newProduct = await products.addProduct(
            title,
            description,
            code,
            Number(price),
            Number(stock),
            category,
            thumbnails
        );

        const updatedProducts = await products.getProducts();

        console.log("Productos updated", updatedProducts);

        socket.emit("updateProducts", updatedProducts);

        res.status(200).send({ message: "Producto agregado.", data: newProduct });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).send({ error: "Error interno del servidor." });
    }

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
    
    try {
        await products.deleteProduct(idProduct);
        const updatedProducts = await products.getProducts();

        console.log("Productos updated", updatedProducts);

        socket.emit("updateProducts", updatedProducts);
        res.status(200).send({ status: "success", message: "Producto Eliminado" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).send({ error: "Error interno del servidor." });
    }
});


export default router;