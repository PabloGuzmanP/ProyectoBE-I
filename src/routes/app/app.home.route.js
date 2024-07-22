import { Router } from "express";
import ProductsManager from "../../managers/ProductsManager.js";


const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
    const { limit = 10, page = 1, order = "asc", category } = req.query;

    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);
        const sort = { field: "price", order: order === "desc" ? -1 : 1 };
        const query = category ? { category } : {};

        const productsFound = await productsManager.getAll(parsedLimit, parsedPage, query, sort);

        const buildLink = (page) => {
            let link = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?limit=${parsedLimit}&page=${page}`;
            if (order) {
                link += `&order=${order}`;
            }
            if (category) {
                link += `&category=${encodeURIComponent(category)}`;
            }
            return link;
        }

        const prevLink = productsFound.hasPrevPage ? buildLink(productsFound.prevPage) : null;
        const nextLink = productsFound.hasNextPage ? buildLink(productsFound.nextPage) : null;

        res.status(200).json({ status: true, payload: { ...productsFound, prevLink, nextLink } });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

export default router;