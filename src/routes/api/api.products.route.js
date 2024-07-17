import {Router} from "express";
import products from "../../product.js";
import serverSocket from "../../config/socket.config.js";
import ProductsManager from "../../managers/ProductsManager.js";

const router = Router();
const socket = serverSocket.config();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
    const { limit = 10, page = 1, query, sort } = req.query;

    try {
        const parsedSort = sort ? JSON.parse(sort) : undefined;
        const parsedQuery = query ? JSON.parse(query) : {};

        const productsFound = await productsManager.getAll(limit, page, parsedQuery, parsedSort);

        const buildLink = (page) => {
            let link = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?limit=${limit}&page=${page}`;
            if(sort){
                link += `&sort=${encodeURIComponent(sort)}`;
            }
            if(query){
                link += `&query=${encodeURIComponent(query)}`;
            }
            return link;
        }

        const prevLink = productsFound.hasPrevPage ? buildLink(productsFound.prevPage) : null;
        const nextLink = productsFound.hasNextPage ? buildLink(productsFound.nextPage) : null;

        res.status(200).json({ status: true, payload: {...productsFound, prevLink, nextLink}});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    const getProduct = await productsManager.getOneById(id);
    res.status(200).send({status: "success", data:getProduct})
});

router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await productsManager.addProduct(newProduct);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const updateFields= req.body;

    const updateProduct = await productsManager.updatedProduct(id, updateFields);

    if(!updateFields){
        res.status(404).send({ error: "Producto no encontrado" });
    } else {
        res.status(200).send({ message: "Producto actualizado correctamente.",data: updateProduct });
    }
    
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await productsManager.deleteProduct(id);
        res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});


export default router;