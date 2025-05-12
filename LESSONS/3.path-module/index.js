const path = require('path');
// How to get file name
console.log("Directory Name:", path.dirname(__filename));
// How to get file name
console.log("File Name:", path.basename(__filename));
// How to get file extension
console.log("File Extension:", path.extname(__filename));
// How to join path
const joinPath = path.join("/user", "documents", "nodes", "projects")

console.log("Joined Path: ", joinPath)
// How to resolve path
const resolvePath = path.resolve("user", "documents", "node", "projects")

console.log("Resolve Path: ", resolvePath)
// How to resolve path
const normalizePath = path.normalize("/user/.documents/../node/project")
console.log("normalizePath: ", normalizePath)