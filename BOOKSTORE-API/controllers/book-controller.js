const Book = require('../models/Book')

const getAllBooks = async (req, res) => {

};

const getSingleBookById = async (req, res) => {};

const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData)
        if(newBookFormData) {
            res.status(201).json({
                success : true,
                message : "Book added successflly",
                data : newlyCreatedBook
            });
        }
    }
    catch(e) {
        console.error("Error: ", e);
    }
};

const updateBook = async (req, res) => {};

const deleteBook = async (req, res) => {};

module.exports = {getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook};