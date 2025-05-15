const fs = require('fs')

function person(name, callbackFn) {
    console.log(`Hello ${name}`);
    callbackFn();
}

function address() {
    console.log("BD")
}

person("Jid", address)
fs.writeFileSync("input.txt", "callback logic concepts")
fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) {
        console.error("Error reading file", err)
        return
    }

    console.log(data)
})