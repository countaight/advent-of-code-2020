const fs = require('fs');

const inputFile = fs.readFileSync('./input.txt', 'utf8', (err, data) => data);

const expenses = inputFile.split("\n").map((num) => Number(num));

const findMultExp = (ary, toBeSummed) => {
  if (ary.length < 1) {
    return 'Not enough entries'
  };

  let mult;
  let sum;

  ary.forEach((item, idx) => {
    const sumWithEach = ary.slice(idx + 1);
     sumWithEach.forEach((sumExpense) => {
      sum = item + sumExpense;
      
      if (sum === toBeSummed) {
        mult = item * sumExpense;
      } else {
        return;
      };
    });
  
  });

  return mult;
};

console.log('Here', findMultExp(expenses, 2020));

expenses.forEach((exp, idx) => {
  const sumNeeded = 2020 - exp;
  const leftOverAry = expenses.slice(idx + 1);
  const mult = findMultExp(leftOverAry, sumNeeded);

  if (typeof mult === 'number') {
    console.log("Multiplication", mult * exp);
  }
});