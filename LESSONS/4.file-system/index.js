const fs = require("fs")
const path = require("path")

// How to create a directory in the project folder
const dataFolder = path.join(__dirname, 'data');

if(!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log("Data folder created")
}

// How to create a file in the directory
const filePath = path.join(dataFolder, 'example.txt');
// Sync way of creating the file
fs.writeFileSync(filePath, 'Hello from node js')
console.log("File created successfully")

// How to read content from file
const readContentFromFile = fs.readFileSync(filePath, "utf8")
console.log('File content:', readContentFromFile)

// How to add content to an existing file
fs.appendFileSync(filePath, '\nThis is a new line added to that file')
console.log("new file content added");

// Async way of creating the file
const asyncFilePath = path.join(dataFolder, 'async-example.txt')
fs.writeFile(asyncFilePath, 'Hello async node js', (err) => {
    if (err) throw new err;
    console.log('Async file is created successfully')
})

// How to read content from file (the async way)
fs.readFile(asyncFilePath, 'utf8', (err, data) => {
    if(err) throw new err;
    console.log('Async file content:', data)

    fs.appendFile(asyncFilePath, "\nThis is another line added", (err) => {
        if(err) throw new err;
        console.log('New line added to async file')

        fs.readFile(asyncFilePath, "utf8",  (err, updatedData) =>{
            if (err) throw new err;
            console.log("Async file content(Update):", updatedData);
        })
    })
})