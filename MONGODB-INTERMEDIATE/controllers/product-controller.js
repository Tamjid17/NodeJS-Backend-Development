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

const getProductAnalysis = async (req, res) => {
    try {
        const result = await Product.aggregate([
            // stage 1 -> only target items where attribute category is 'Electronics'
            {
                $match : {
                    category : "Electronics"
                },
            },
            // stage 2 -> based on match condition group items showing totalRevenue, avgPrice, minPrice, maxPrice
            {
                $group : {
                    _id : null,
                    totalRevenue : {
                        $sum : "$price"
                    },
                    averagePrice : {
                        $avg : "$price"
                    },
                    maxProductPrice : {
                        $max : "$price",
                    },
                    minProductPrice : {
                        $min : "$price",
                    },
                }
            },
            // stage 3 -> control display of grouped attributes using 1 or 0 and derive more attribute values using grouped attributes
            {
                $project : {
                    _id : 0,
                    totalRevenue : 1,
                    averagePrice : 1,
                    maxProductPrice : 1,
                    minProductPrice : 1,
                    priceRange : {
                        $subtract : ["$maxProductPrice", "$minProductPrice"]
                    }
                }
            }
        ]);

        res.status(200).json({
          success: true,
          data: result,
        });
    } catch(e) {
        console.error("Error: ", e);
        res.status(500).json({
          success: false,
          message: "Something went wrong, please try again later",
        });
    }
}
const getProductStats = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                //stage 1 : aggregate -> get products based on inStock and price greater than
                $match: {
                    inStock : true,
                    price : {
                        $gte : 100
                    }
                }
            },
            // stage 2 : group -> grouping documents based on category and calculating average price
            // of the items and item counts matching the condition of stage 1
            {
                $group : {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum : 1,
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
module.exports = { insertSampleProducts, getProductStats, getProductAnalysis };