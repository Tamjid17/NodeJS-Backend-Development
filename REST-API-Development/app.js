const express = require('express');
const app = express();

// Middleware
app.use(express.json())

const books = [
    {
        id: "1",
        title: "Book 1",
    },
    {
        id: "2",
        title: "Book 2",
    },
];

//intro route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our bookstore api",
    })
});

//get all books
app.get('/get', (req, res) => {
    res.json(books);
});

app.get('/get/:id', (req, res) => {
    const book = books.find(item => item.id === req.params.id);
    if(book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({
            message: "Book not found try with a different book ID",
        });
    }
})


const port = 3000;

//add a new book
app.post('/add', (req, res) => {
    const newBook = {
      id: Math.floor(Math.random() * 1000).toString(),
      title: `Book ${Math.floor(Math.random() * 1000)}`,
    };

    books.push(newBook);

    res.status(200).json({
        data: newBook,
        message: "New book is added successfully",
    });
})

// update a book
app.put('/update/:id', (req, res) => {
    const book = books.find(book => book.id === req.params.id);
    if(book){

        book.title = req.body?.title || book.title;
        res.status(200).json({
            message : `Book with ID ${req.params.id} is updated successfully`,
            data : book,  
        })
    } else {
        res.status(404).json({
            message: `Book with the id ${req.params.id} not found.`
        })
    }
    

})

// delete a book
app.delete('/delete/:id', (req, res) => {
    const bookIndex = books.findIndex(book => book.id === req.params.id);

    if(bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.status(200).json({
            message: `Book with ID ${req.params.id} deleted successfully.`,
        });
    } else {
        res.status(404).json({
          message: `Book with ID ${req.params.id} not found.`,
        });
    }
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})