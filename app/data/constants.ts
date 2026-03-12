export const samplePrompts = [
  "Create a function that reverse a string",
  "Implement a todo list component in Rect",
  "Write a python script that download files from a URL",
  "Create a REST API endpoint for user authentication"
]

export const sampleCode = `// Sample: Fibonacci function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

export const sampleBuggyCode = `// Sample: Fibonacci function that throws an error
function fibonacci(n) {
  let total = 0;
  for (let i = 0; i < n.length; i++) {
  total += n[i].price;
  }
  return total;
}`;

export const languages = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "PHP",
  "TypeScript",
  "Ruby",
  "Rust",
  "Swift",
  "C"
]