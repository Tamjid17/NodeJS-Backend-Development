const Product = require('../models/Products');

const insertSampleProducts = async (req, res) => {
    try{
        const sampleProducts = [
            {
                name: "Laptop",
                category: "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer", "tech"],
            },
            {
                name: "Smartphone",
                category: "Electronics",
                price: 699,
                inStock: true,
                tags: ["mobile", "tech"],
            },
            {
                name: "Headphones",
                category: "Electronics",
                price: 199,
                inStock: false,
                tags: ["audio", "tech"],
            },
            {
                name: "Running Shoes",
                category: "Sports",
                price: 89,
                inStock: true,
                tags: ["footwear", "running"],
            },
            {
                name: "Novel",
                category: "Books",
                price: 15,
                inStock: true,
                tags: ["fiction", "bestseller"],
            },
        ];

                    // insert multiple items in a single mongodb schema
        const result = await Product.insertMany(sampleProducts)

        res.status(201).json({
            success : true,
            message : 'Items added to database',
            data : `Inserted ${result.length} items to Product`
        })
    } catch(e) {
        console.error("Error: ", e)
        res.status(500).json({
            success : false,
            message : "Something went wrong, please try again later"
        })
    }
}

const getProductStats = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                //stage 1 get products based on inStock and price greater than
                $match: {
                    inStock : false,
                    price : {
                        $gte : 100
                    }
                }
            }
        ]);

        res.status(200).json({
            success : true,
            data : result
        })
    } catch(e) {
        console.error("Error: ", e);
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later",
        });
    }
}
module.exports = { insertSampleProducts, getProductStats };