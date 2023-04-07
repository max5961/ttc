const Calculator = (function(){
    const add = (a,b) => a+b;
    return {
        add,
    };
})();

console.log(Calculator.add(5,20));