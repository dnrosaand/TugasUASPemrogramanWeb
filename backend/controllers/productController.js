const productModel = require("../models/productModel");

exports.getProducts = async (req, res) => {

    try {

        const products = await productModel.getAllProducts();

        res.json(products);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};