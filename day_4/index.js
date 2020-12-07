const fs = require('fs');

const inputData = fs.readFileSync('./input.txt', 'utf8');

const REQUIRED = [
  'byr',
  'iyr', 
  'eyr', 
  'hgt', 
  'hcl', 
  'ecl', 
  'pid'
]

const EYE_COLORS = [
  'amb',
  'blu',
  'brn',
  'gry',
  'grn',
  'hzl',
  'oth'
]

const passports = inputData.split(/\n{2,}/g).map((item) => {
  const obj = {};
  const splitItem = item.split(/\n| /g);
  splitItem.forEach((line) => {
    const [ key, value ] = line.split(':');
    obj[key] = value;
  });
  return obj;
});

const isPresent = (passport) => {
  const arr = Object.keys(passport);
  return REQUIRED.every((val) => arr.includes(val));
};

const isWithinRange = (val, range) => {
  const n = isNaN(val) ? Number(val) : val;
  return range[0] <= n && n <= range[1];
};

const hasValidHeight = (val) => {
  if (val.includes('cm')) {
    const height = val.split(/cm/)[0];
    return isWithinRange(height, [150, 193]);
  }

  if (val.includes('in')) {
    const height = val.split(/in/)[0];
    return isWithinRange(height, [59, 76]);
  }

  return false;
};

const hasValidHex = (val) => {
  const match = val.match(/^#([A-Fa-f0-9]{6})/);
  return Boolean(match)
}

const hasValidPID = (val) => {
  const match = val.match(/^\d{9}$/);
  return Boolean(match);
}

const isValid = (passport) => {
  if (!isWithinRange(passport.byr, [1920, 2002])) {
    return false;
  }

  if (!isWithinRange(passport.iyr, [2010, 2020])) {
    return false;
  }

  if (!isWithinRange(passport.eyr, [2020, 2030])) {
    return false;
  }

  if (!hasValidHeight(passport.hgt)) {
    return false;
  }

  if(!hasValidHex(passport.hcl)) {
    return false;
  };

  if (!hasValidPID(passport.pid)) {
    return false;
  }

  return EYE_COLORS.includes(passport.ecl);
};

const presentFieldsPassports = passports.filter(passport => isPresent(passport) === true);

const validPassports = presentFieldsPassports.filter(passport => isValid(passport));

console.log(validPassports.length);