// Find the Second-Largest Unique Number

//    - Input: [10, 5, 20, 8, 20, 15]
//    - Output: 15

const findSecondLArgest = (input) => {
    let largest = 0
    let secondlargest = 0
    for (let i = 0; i < input.length; i++) {

        if (input[i] > largest) {
            secondlargest = largest
            largest = input[i]
        } else if (input[i] > secondlargest && input[i] !== largest) {
            secondlargest = input[i]
        }
    }
    return secondlargest
}

console.log("second largest number", findSecondLArgest([10, 5, 20, 8, 20, 15]));

// 2. Find All Missing Numbers
   
//    - Input: [1, 3, 6, 2, 7] (numbers range from 1 to 8)
//    - Output: [4, 5, 8]
//    - Challenge: Solve using Set and then without using Set.

const findMissingNumbersUsingSet =(input)=>{
  const inputSet = new Set(input)
  let result =[]
  for(let i=1;i<=8;i++){
    if(!inputSet.has(i)){
        result.push(i)
    }
  }
  return result
}

console.log("missing numbers", findMissingNumbersUsingSet([1, 3, 6, 2, 7]));

const findMissingNumbersWithoutUsingSet =(input)=>{
  let result =[]
  for(let i=1;i<=8;i++){
    if(!input.includes(i)){
        result.push(i)
    }
  }
  return result
}

console.log("missing numbers without set", findMissingNumbersUsingSet([1, 3, 6, 2, 7]));

// 3. Count Character Frequency in a String
   
//    - Input: "javascript"
//    - Output: Count the occurrences of each character.
//    - Challenge: Ignore spaces and treat uppercase and lowercase as the same.

const occourenceOfEachElementUsingReducer =(string)=>{
    // using reducer
    const stringCount = string.split("").reduce((accumulator,current) => {
        accumulator[current] = (accumulator[current] || 0 ) +1;   
        return accumulator
    }, {})
    return stringCount
    
}

console.log("find occurencs using reducer", occourenceOfEachElementUsingReducer("javascript"));

const occourenceOfEachElementWithoutBuiltin =(string)=>{
    const result ={}
    const stringArray = string.split('')
    for (let i=0;i<stringArray.length; i++) {
        result[stringArray[i]] = (result[stringArray[i]] || 0) + 1

    }
    return result
    
}

console.log("find occourences without built in", occourenceOfEachElementWithoutBuiltin("javascript"));

const occourenceOfElementUsingMap = (string) => {
    const resultCount = new Map()
    const stringArray = string.split('')
    for (let i=0; i< stringArray.length; i++)  {
        resultCount.set(stringArray[i], (resultCount.get(stringArray[i]) || 0) +1)
    }
    return resultCount
}

console.log("occourenceof element using map", occourenceOfElementUsingMap("javascript"));

// 4. Find Duplicate Elements in an Array
   
//    - Input: [1, 2, 3, 2, 4, 1, 5]
//    - Output: [1, 2]
//    - Challenge: Solve using filter() and Set.

const findDuplicatesUsingFilterSet = (input) => {
    const seen = new Set();
  // Line 1: Collect all duplicate items into a new Set to ensure uniqueness
  const duplicates = new Set(input.filter(item => seen.has(item) || !seen.add(item)));
  
  // Line 2: Convert the duplicates Set back into an array
  return Array.from(duplicates);
}

console.log("find duplicates", findDuplicatesUsingFilterSet([1, 2, 3, 2, 4, 1, 5]));

// 5. Move All Zeros to the End
   
//    - Input: [0, 1, 0, 3, 12]
//    - Output: [1, 3, 12, 0, 0]
//    - Challenge: Maintain the order of non-zero elements without creating another array.

const moveZerosToEnd = (input) => {
    let temp = 0
    for (let i=0;i<input.length ; i++) {
        console.log("temp", temp);
        console.log("input[i", input[i]);
        
        
        if (input[i] !==0) {
            [input[temp], input[i]] =  [input[i], input[temp]]
            console.log("input", input);
            
            temp++;
        }
    
    }
    return input
}

console.log("move zeroes to end", moveZerosToEnd([0, 1, 0, 3, 12]));

