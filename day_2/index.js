const fs = require('fs');

const inputData = fs.readFileSync('./input.txt', 'utf8');

const passwords = inputData.split("\n").map((line) => {
  const parsedLine = line.split(' ');
  const lowUp = parsedLine[0].split('-');
  const char = parsedLine[1][0];
  const password = parsedLine[2];

  return { bounds: lowUp, char, password };
});

const analyzedPasswords = passwords.map((entry) => {
  const splitPass = entry.password.split('');
  const foundAry = splitPass.filter((item) => item === entry.char).length;
  const parseBounds = entry.bounds.map((bound) => Number(bound));
  
  return parseBounds[0] <= foundAry && foundAry <= parseBounds[1];
});

console.log(analyzedPasswords.filter((item) => Boolean(item) === true).length);

const newlyAnalyzedPasswords = passwords.map((entry) => {
  const splitPass = entry.password.split('');
  const parseBounds = entry.bounds.map((bound) => Number(bound));
  const firstPos = splitPass[parseBounds[0] - 1];
  const secondPos = splitPass[parseBounds[1] - 1];

  if (firstPos === secondPos) {
    return false;
  }

  return firstPos === entry.char || secondPos === entry.char;
});

console.log(newlyAnalyzedPasswords.filter((item) => Boolean(item) === true).length);