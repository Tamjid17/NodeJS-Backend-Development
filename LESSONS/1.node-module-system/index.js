//module.exports
//require

const firstModule = require('./first-module')

console.log(firstModule.add(4,5));

try {

    console.log('trying to divide by zero')
    let result = firstModule.division(8, 0)
    console.log(result)

} catch(error) {
    console.log("Caught an error", error.message)
}

//module wrapper
// (
//     function(exports, require, module, file_name, directory_name) {
//         //my module code goes here
//     }
// )