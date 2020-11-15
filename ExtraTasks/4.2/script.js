function add(x, y){
  if (y === undefined){
       return function (z){
          return z+x;
      }
  }
  return x = x+y;
};

function sub(x, y){
  if (y === undefined){
      return function (z){
          return z-x;
      }
  }
  return x= x-y;
};

function mul(x, y){
  if (y === undefined){
      return function (z){
          return z*x;
      }
  }
  return x= x*y;
};

function div(x, y){
  if (y === undefined){
      return function (z){
          return z/x;
      }
  }
  return x = x/y;
};


function pipe(){
  const elements = arguments;
  return function (el){
      let arg = el;
      let result;
      for(let i=0;i <elements.length; i++){
          result = elements[i](arg);
          arg = result;
      }
      return result;
  };
};

a = add(1,2); //3
console.log('a =', a);
let b = mul(a, 10); //30
console.log('b =', b);
let sub1 = sub(1); // sub1 отнимает от любого числа единицу
let c = sub1(b); // 29
console.log('с =', c);
let d = mul(sub(a,1),c); // 58
console.log('d =', d);
let mul1 = mul(2);
let i = mul1(d); // Умножает любое число на 2
let add1 = add(2); // Прибавляет к любому числу 2
let k = add1(d); // 60
console.log('k =', k); 
let doSmth = pipe(add(d), sub(c), mul(b), div(a));
console.log('doSmth(0) =', doSmth(0)); // 290
let x = pipe(add(1), mul(2))(3); // 8
console.log('x =', x);