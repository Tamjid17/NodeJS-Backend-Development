function delayFn(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

console.log("Promise starts")
delayFn(3000).then(() => console.log('after 3 seconds promise resolved'))
console.log('end')

function divideFn(num1, num2) {
    return new Promise((resolve, reject) => {
        if(num2 === 0)
            reject('Cannot perform division by zero')
        else {
            resolve(num1/num2);
        }
    })
}

divideFn(10, 5)
.then((result) => console.log(result))
.catch((error) => console.log(error))