const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve('Stuff Worked');
    } else { 
        reject('Error, it broke');
    }
});

promise
    .then(result => result + '!')
    .then(result2 => {
        console.log(result2);
    });

//or

const promise2 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve('Stuff Worked');
    } else { 
        reject('Error, it broke');
    }
});
