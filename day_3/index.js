const fs = require('fs');

const inputData = fs.readFileSync('./input.txt', 'utf8');

const treeMap = inputData.split("\n");

const buildPath = (right, down) => {
  const path = [];
  const origin = [0, 0]
  path.push(origin);
  for (let i = 1; i * down < treeMap.length; i++) {
    path.push([i * right, i * down])
  }
  return path;
}

const checkForTree = (coords) => {
  const treeOrNot = treeMap[coords[1]][coords[0] % 31]
  return treeOrNot === '#'
}

const countTreesForPath = ([ right, down ]) => {
  let treeCounter = 0;
  const path = buildPath(right, down);
  path.forEach((coords) => {
    checkForTree(coords) ? treeCounter++ : null;
  });
  return treeCounter;
}

const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

console.log(slopes.map((slope) => countTreesForPath(slope)).reduce((p, c) => p * c))