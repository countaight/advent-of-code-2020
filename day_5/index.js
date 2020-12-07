const fs = require('fs');

const inputData = fs.readFileSync('./input.txt', 'utf8');

const passes = inputData.split("\n");

const rows = [];

for (let i = 0; i < 128; i++) {
  rows.push(i);
};

const seats = [];

for (let i = 0; i < 8; i++) {
  seats.push(i);
}

const testPass = 'FBFBBFFRLR';

const findRow = (pass) => {
  const inst = pass.split('').slice(0, 7);
  
  const row = inst.reduce((p, c) => {
    const middle = p.length / 2
    
    return c === 'F' ? p.slice(0, middle) : p.slice(middle, p.length);
  }, rows);

  return row[0];
};

const findSeat = (pass) => {
  const inst = pass.split('').slice(7, 10);

  const seat = inst.reduce((p, c) => {
    const middle = p.length / 2;

    return c === 'L' ? p.slice(0, middle) : p.slice(middle, p.length);
  }, seats);

  return seat[0];
}

const calculatePassId = (pass) => {
  const row = findRow(pass);

  const seat = findSeat(pass);

  return Number(row * 8 + seat);
}

const ids = passes.map(calculatePassId).sort((a, b) => a < b ? -1 : 1).map((id, idx, arry) => {
  return {
    seatId: id,
    seatPlusOne: id + 1 === arry[idx + 1],
    seatMinusOne: id - 1 === arry[idx - 1]
  }
});

console.log(ids.filter((id) => id.seatPlusOne === false || id.seatMinusOne === false));