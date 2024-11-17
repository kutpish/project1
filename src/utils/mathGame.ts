export function generateQuestion() {
  const operations = ['+', '-'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1 = Math.floor(Math.random() * 20) + 1;
  let num2 = Math.floor(Math.random() * 20) + 1;
  
  if (operation === '-' && num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  
  const answer = operation === '+' ? num1 + num2 : num1 - num2;
  return { num1, num2, operation, answer };
}