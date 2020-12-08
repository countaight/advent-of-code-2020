const fs = require('fs');

const inputData = fs.readFileSync('./day_6/input.txt', 'utf8');

const groups = inputData.split(/\n\n/).map((group) => {
  const allAnswers = group.split(/\n/).flat().join('');

  const set = new Set(allAnswers.split(''));

  return set.size;
});

const newGroups = inputData.split(/\n\n/).map((group) => group.split(/\n/).map((line) => line.split('')));

groups.reduce((p, c) => p + c, 0);

const findAllYes = (group) => {
  return group.reduce((p, c) => p.filter((value) => c.includes(value))).length;
}

console.log(newGroups.map(findAllYes).reduce((p, c) => p + c, 0));