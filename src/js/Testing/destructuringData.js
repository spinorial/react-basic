//Experiments on destructuring data for ES6 syntax.

//Destructuring Arrays

//-------------------------------------//

const someDataArray = ['Joseph','Marshall', 'Doctor', 37];


//Can use the data normaly by accessing the data from the array directly
console.log(`My name is: ${someDataArray[0]} ${someDataArray[1]}`);


//Can destructure the array into variables. Commas can seperate out data that you do not want to destructure


// const [firstName,sirName,,age] = someDataArray;

// console.log(`My name is: ${firstName} ${sirName}, I am ${age}`);


//---------------------------------------//


//Destructuring Objects

// const someObject = {firstName: 'Joseph', sirName: 'Marshall', profession: 'Doctor', age: 37};

//As above can access the data directly

// console.log(`My name is: ${someObject.firstName} ${someObject.sirName}, I am ${someObject.age}`);

// const {firstName, sirName, profession, age} = someObject;

// console.log(`My name is: ${firstName} ${sirName}, I am ${age}`);

//What if we didn't want to use those variable names, we can reset them.


// const {firstName, sirName, profession: job, age} = someObject;

// console.log(`My name is: ${firstName} ${sirName}, I am ${age}, I work as a ${job}`);

//We could go one step further and set default values for these terms. Also can set a default value if object doesn't have



// const someObject2 = {firstName: 'Joseph', sirName: 'Marshall', age: 37};

// const {firstName, sirName, profession: job = 'Doctor', age} = someObject2;

// console.log(`My name is: ${firstName} ${sirName}, I am ${age}, I work as a ${job}`);


//Nested Objects

const someObject2 = {firstName: 'Joseph', sirName: 'Marshall', job: {profession: 'Doctor', speciality: 'Neurology'}, age: 37};

const {firstName, sirName, job, age} = someObject2;

console.log(`My name is: ${firstName} ${sirName}, I am ${age}, I work as a ${job}`);



