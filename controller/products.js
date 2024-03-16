import { getExistingProducts, getExistingProduct, addNewProduct, editExistingProduct, removeExistingProduct } from '../models/products.js';

export default {

    getManyProducts: async (req, res) => {

        try {

            const products = await getExistingProducts();

            res.send(products);

        } catch (error) {

            console.error("Error fetching products:", error);

            res.status(500).json({ error: "Error fetching products" });

        }
    },

    addOneProduct: async (req, res) => {

        try {

            const { prodName, prodDesc, category, price, quantity, prodImage } = req.body;

            const post = await addNewProduct(prodName, prodDesc, category, price, quantity, prodImage);

            res.send(await getExistingProducts());

        } catch (error) {

            console.error("Error adding product:", error);

            res.status(500).send({ error: "An error occurred while adding the product" });

        }
    },

    getOneProduct: async (req, res) => {

        try {

            const productId = +req.params.prodID;

            const product = await getExistingProduct(productId);

            if (product) {

                res.send(product);

            } else {

                res.status(404).send({ error: "Product not found" });
            }
        } catch (error) {

            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    editOneProduct: async (req, res) => {
        try {
            const [product] = await getExistingProduct(+req.params.prodID);
    
            let { prodName, prodDesc, category, price, quantity, prodImage } = req.body;
    
            prodName = prodName || product.prodName;

            prodDesc = prodDesc || product.prodDesc;

            category = category || product.category;

            quantity = quantity || product.quantity;

            price = price || product.price;

            prodImage = prodImage || product.prodImage;
    
            await editExistingProduct(+req.params.prodID, prodName, prodDesc, category, price, quantity, prodImage);
    
            res.json(await getExistingProducts());

        } catch (error) {

            res.status(500).json({ error: 'An error occurred while editing the product.' });
        }
    },
    

    deleteOneProduct: async (req, res) => {

        try {

            const productId = +req.params.prodID;

            const deletedProduct = await removeExistingProduct(productId);

            if (deletedProduct) {

                res.send({ message: "Product deleted successfully" });

            } else {

                res.status(404).send({ error: "Product not found" });

            }
        } catch (error) {

            res.status(500).send({ error: "Internal Server Error" });

        }
    }
};