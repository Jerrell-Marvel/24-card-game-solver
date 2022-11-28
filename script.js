const solutionContainer = document.querySelector(".solution");
const container = document.querySelector(".container");
let operators = ["+", "-", "*", "/"];
let tempOperators = [];
let operatorCombinations = [];

for (let i = 0; i < operators.length; i++) {
  tempOperators[0] = operators[i];
  for (let j = 0; j < operators.length; j++) {
    tempOperators[1] = operators[j];
    for (let k = 0; k < operators.length; k++) {
      tempOperators[2] = operators[k];
      operatorCombinations.push([...tempOperators]);
    }
  }
}

const getParanthesesCombinations = (numbers, operators) => {
  const [num1, num2, num3, num4] = numbers;
  const [op1, op2, op3] = operators;

  const parantheses0 = `${num1}${op1}${num2}${op2}${num3}${op3}${num4}`;

  const parantheses1 = `(${num1}${op1}${num2})${op2}${num3}${op3}${num4}`;
  const parantheses2 = `${num1}${op1}(${num2}${op2}${num3})${op3}${num4}`;

  const parantheses3 = `${num1}${op1}${num2}${op2}(${num3}${op3}${num4})`;

  const parantheses4 = `(${num1}${op1}${num2})${op2}(${num3}${op3}${num4})`;
  const parantheses5 = `(${num1}${op1}${num2}${op2}${num3})${op3}${num4}`;
  const parantheses6 = `${num1}${op1}(${num2}${op2}${num3}${op3}${num4})`;
  const parantheses7 = `${num1}${op1}((${num2}${op2}${num3})${op3}${num4})`;
  const parantheses8 = `${num1}${op1}(${num2}${op2}(${num3}${op3}${num4}))`;
  const parantheses9 = `((${num1}${op1}${num2})${op2}${num3})${op3}${num4}`;
  const parantheses10 = `(${num1}${op1}(${num2}${op2}${num3}))${op3}${num4}`;

  return [parantheses0, parantheses1, parantheses2, parantheses3, parantheses4, parantheses5, parantheses6, parantheses7, parantheses8, parantheses9, parantheses10];
};

const form = document.querySelector(".form");
const inputTags = [...document.querySelectorAll("input")];
const totalSolution = document.querySelector(".total-solution");
form.addEventListener("submit", function (e) {
  solutionContainer.innerHTML = "";
  e.preventDefault();
  const inputs = inputTags.map((tag) => tag.value);
  let inputCombinations = [];
  let tempInputs = [];

  let availableNums = [...inputs];
  for (let i = 0; i < inputs.length; i++) {
    tempInputs[0] = inputs[i];
    let availableNums1 = availableNums.filter((data, index) => {
      return index !== i;
    });

    for (let j = 0; j < availableNums1.length; j++) {
      tempInputs[1] = availableNums1[j];
      let availableNums2 = availableNums1.filter((data, index) => {
        return index !== j;
      });

      for (let k = 0; k < availableNums2.length; k++) {
        tempInputs[2] = availableNums2[k];
        let availableNums3 = availableNums2.filter((data, index) => {
          return index !== k;
        });

        for (let l = 0; l < availableNums3.length; l++) {
          tempInputs[3] = availableNums3[0];
          inputCombinations.push([...tempInputs]);
        }
      }
    }
  }

  let solutions = 0;
  console.log(inputCombinations);
  inputCombinations.forEach((inputCombination) => {
    operatorCombinations.forEach((operatorCombination) => {
      const paranthesesCombinations = getParanthesesCombinations(inputCombination, operatorCombination);
      paranthesesCombinations.forEach((combination) => {
        if (eval(combination) === 24) {
          solutions++;
          console.log(combination);

          const li = document.createElement("li");
          li.textContent = combination;

          solutionContainer.appendChild(li);
        }
      });

      totalSolution.textContent = `Total solutions : ${solutions}`;
    });
  });
});
