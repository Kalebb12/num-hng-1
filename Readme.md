# Number Classification API

## Overview
This is a simple API that classifies a given number based on its mathematical properties and fetches a fun fact about it using the Numbers API.

## Features
- Determines if a number is **prime** or **perfect**.
- Checks if a number is an **Armstrong number**.
- Identifies whether a number is **even** or **odd**.
- Calculates the **sum of digits** of the number.
- Fetches a **fun fact** from the Numbers API.

## API Endpoint
### GET `/api/classify-number?number={number}`
**Request Parameters:**
- `number` (integer) - The number to classify.

### Example Request:
```
GET /api/classify-number?number=371
```

### Example Response (200 OK):
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request):
```json
{
    "number": "alphabet",
    "error": true
}
```

## Installation & Setup
### 1. Clone the Repository
```sh
git clone <repository-url>
cd number-classification-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the API
```sh
npm start
```

The server will start on `http://localhost:3000`

## Deployment
To deploy this API, you can use **Render, Railway, or Vercel**. Ensure that your hosting service supports Node.js and Express.

## License
This project is open-source and available under the MIT License.

