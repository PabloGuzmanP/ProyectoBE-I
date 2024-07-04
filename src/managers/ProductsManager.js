import ProductModel from "../models/product.model.js";

export default class ProductsManager {
    #productModel;

    constructor() {
        this.#productModel = ProductModel;
    }

    getAll = async (limit = 10, page = 1, query = {}, sort) => {
        try {
            const options = {
                limit: parseInt(limit, 10),
                page: parseInt(page, 10),
                lean: true
            };

            const queryFilter = {};
            if ((query && query.category) || (query && query.stock)) {
                if(query.category){
                    queryFilter.category = query.category;
                }
                if(query.stock){
                    queryFilter.stock = query.stock
                }
            }

            if (sort && sort.field === "price") {
                options.sort = { [sort.field]: sort.order === 'desc' ? -1 : 1 };
            }

            const products = await this.#productModel.paginate(queryFilter, options);
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
