// build an express web application, that does the following three things

// 1. adds 2 numbers

// this should be a GET with 2 query paramaters : num1 and num2
// GET/add?num1=&num2=

// example:
// GET/add?num1=12&num2=4 
// response = 16

// 2. multiplies 2 numbers
// This should be a POST using a req body with keys: num1 and num2

// POST/multiply
// body:{num1:12, num2= 30}
// response = 36

// 3. returns the negative number
// this should be a GET using a route parameter

// GET/negate/3
// response = -3

// convert strings to numbers when using the path and query functions 