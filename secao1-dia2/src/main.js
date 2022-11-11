// função que gera um número aleatório
const generateRandomNumber = () => Math.round(Math.random() * 10);

//  promise resolvida retornando o número aleatório
const resolvedPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = generateRandomNumber();
      resolve(randomNumber);
    }, 1000);
  });

// resolvedPromise().then((response) => {
//  console.log(`O número gerado é : ${response}`);
// });
// promise rejeitada retornando um objeto de erro
const rejectedPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = generateRandomNumber();
      reject(new Error(`O número ${randomNumber} não é válido`));
    }, 1000);
  });
const randomPromise = () => 
new Promise((resolve, reject) => {
    setTimeout(() => {
        const randomNumber = generateRandomNumber();
        if(randomNumber % 2 === 0){
            resolve(randomNumber)
        }else{
            reject(new Error(`O número ${randomNumber} não é válido, somente números pares são válidos`))
        }
    })
});
// rejectedPromise()
//   .then((response) => {
//     console.log(`rejectPromise: O número gerado é ${response}`);
// })
//   .catch((error) => {
//     console.log(`Rejected Promise: ${error.message}`);
// });

randomPromise()
.then(response => {
    console.log(`Promise resolvida. O número gerado é ${response}`);
})
.catch(error => {
    console.log(`Promise rejeitada ${error.message}`);
})
.finally(() => console.log('Fim da execução da segunda promise.'));