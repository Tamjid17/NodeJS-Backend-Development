const Book = require('../models/Book')

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find({});
        if(allBooks) {
            res.status(201).json({
              success: true,
              message: "Book fetched successfully",
              data: allBooks,
            });
        } else {
            res.status(404).json({
              success: false,
              message: "No book found",
              data: allBooks,
            });
        }
    } catch (e) {
        console.log("Error: ", e);
        res.status(500).json({
          success: false,
          message: "Something went wrong! Please try again",
        });
    }
};

const getSingleBookById = async (req, res) => {
    try {
        const getCurrentBookId = req.params.id;
        const singleBookDetails = await Book.findById(getCurrentBookId)
        if (singleBookDetails) {
          res.status(201).json({
            success: true,
            message: "Current Book fetched successfully",
            data: singleBookDetails,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Book with the current ID not found try another ID",
            data: singleBookDetails,
          });
        }
    } catch(e) {
        console.log("Error: ", e);
        res.status(500).json({
          success: false,
          message: "Something went wrong! Please try again",
        });
    }
};

const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData)
        if(newBookFormData) {
            res.status(201).json({
                success : true,
                message : "Book added successfully",
                data : newlyCreatedBook
            });
        }
    }
    catch(e) {
        console.error("Error: ", e);
        res.status(500).json({
          success: false,
          message: "Something went wrong! Please try again",
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBookFormData = req.body;
        const getCurrentBookId = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(getCurrentBookId, updatedBookFormData, {
            new: true,
        });
        if (updatedBook) {
          res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Book with the current ID not found try another ID",
            data: updatedBook,
          });
        }
    } catch(e) {

    }
};

const deleteBook = async (req, res) => {
    try {
        const getCurrentBookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);
        if(deletedBook) {
            res.status(201).json({
              success: true,
              message: "Book deleted successfully",
              data: deletedBook,
            });
        } else {
          res.status(404).json({
            success: false,
            message: "Book with the current ID not found try another ID",
            data: deletedBook,
          });
        }
    } catch(e) {
        console.error("Error: ", e);
        res.status(500).json({
          success: false,
          message: "Something went wrong! Please try again",
        });
    }
};

module.exports = {getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook};