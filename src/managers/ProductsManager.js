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

    getOneById = async (id) => {
        try {
            const product = await this.#productModel.findById(id);
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    getProducts = async () => {
        try {
            const products = await this.#productModel.find();
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    addProduct = async (productData) => {
        try {
            const newProduct = new this.#productModel(productData);
            const savedProduct = await newProduct.save();
            return savedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    deleteProduct = async (id) => {
        try {
            const deleteProduct = await this.#productModel.findByIdAndDelete(id);
            if (!deleteProduct) {
                throw new Error("Producto no encontrado");
            }
            return deleteProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    updatedProduct = async (id, data) => {
        try {
            const userUpdated = await this.#productModel.findByIdAndUpdate(id, data);
            if(!userUpdated) {
                throw new Error("Producto no encontrado");
            }
            
            return userUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}
