const Book = require("../models/Book");
const Author = require("../models/Author");


const createAuthor = async (req, res) => {
    try {
        const author = req.body;
        const newAuthor = await Author.create(author);
        if(!newAuthor) {
            return res.status(404).json({
              success: false,
              message: "new Author creation was unsuccessful",
            });
        }
        return res.status(201).json({
          success: true,
          message: "new Author created successfully",
          data : newAuthor
        });
    } catch(e) {
        console.error("Error: ", e);
        res.status(500).json({
            success : false,
            message : 'Something went wrong, try again later'
        })
    }
}

const createBook = async (req, res) => {
  try {
    const book = req.body;
    const newBook = await Book.create(book);
    if (!newBook) {
      return res.status(404).json({
        success: false,
        message: "new Book creation was unsuccessful",
      });
    }
    return res.status(201).json({
      success: true,
      message: "new Book created successfully",
      data: newBook,
    });
  } catch (e) {
    console.error("Error: ", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong, try again later",
    });
  }
};

const getBookWithAuthor = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if(!book) {
            return res.status(404).json({
              success: false,
              message: "Book not found",
            }); 
        }
        res.status(201).json({
          success: true,
          data: book,
        });
    } catch(e) {
        console.error("Error: ", e);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again later",
        });
    }
}

module.exports = { createAuthor, createBook, getBookWithAuthor }