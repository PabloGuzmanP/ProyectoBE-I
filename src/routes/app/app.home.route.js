import { Router } from "express";
import ProductsManager from "../../managers/ProductsManager.js";


const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
    const { limit = 10, page = 1, query, sort } = req.query;

    try {
        const parsedSort = sort ? JSON.parse(sort) : undefined;
        const parsedQuery = query ? JSON.parse(query) : {};

        const productsFound = await productsManager.getAll(limit, page, parsedQuery, parsedSort);

        const buildLink = (page) => {
            let link = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?limit=${limit}&page=${page}`;
            if (sort) {
                link += `&sort=${encodeURIComponent(sort)}`;
            }
            if (query) {
                link += `&query=${encodeURIComponent(query)}`;
            }
            return link;
        }

        const prevLink = productsFound.hasPrevPage ? buildLink(productsFound.prevPage) : null;
        const nextLink = productsFound.hasNextPage ? buildLink(productsFound.nextPage) : null;

        res.render("home", { products: productsFound.docs, pagination: {...productsFound, prevLink, nextLink}});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

export default router;