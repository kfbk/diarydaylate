export default (context, inject) => {
    inject('doSomething', (msg) => console.log(`Hello ${msg}!`))
  }