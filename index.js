const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

// Utility functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num) => {
  if (num < 1) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i + (i !== num / i ? num / i : 0);
    }
  }
  return sum === num && num !== 1;
};

const isArmstrong = (num) => {
  const absNum = Math.abs(num);
  const digits = absNum.toString().split('').map(Number);
  const power = digits.length;
  return digits.reduce((sum, d) => sum + Math.pow(d, power), 0) === absNum;
};

const getProperties = (num) => {
  const props = [];
  if (isArmstrong(num)) props.push("armstrong");
  props.push(num % 2 === 0 ? "even" : "odd");
  return props;
};

const digitSum = (num) => {
  return Math.abs(num).toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
};
app.get('/api/classify-number', async (req, res) => {
  const numberStr = req.query.number;
  if (!numberStr) {
    return res.status(400).json({ error: true, number: "" });
  }

  const number = parseInt(numberStr);

  if (isNaN(number)) {
    return res.status(400).json({ error: true, number: numberStr });
  }

  try {
    const factResponse = await axios.get(`http://numbersapi.com/${number}/math`);
    const result = {
      is_prime: isPrime(number),
      is_perfect: isPerfect(number),
      properties: getProperties(number),
      digit_sum: digitSum(number),
      fun_fact: factResponse.data,
    };
    res.status(200).json({ number, ...result });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fun fact." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
