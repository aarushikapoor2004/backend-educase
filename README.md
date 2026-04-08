# School Management API

A REST API built with Node.js, Express, and MySQL to manage school data. Supports adding schools and retrieving them sorted by proximity to a given location.

## Tech Stack

- Node.js
- Express.js
- MySQL (hosted on Railway)

## Project Structure
backend-educase/
├── config/
│   └── db.js
├── controllers/
│   └── school.js
├── middleware/
│   └── middleware.js
├── routes/
│   └── schoolRoutes.js
├── app.js
└── package.json

## Local Setup

1. Clone the repo
```bash
   git clone https://github.com/aarushikapoor2004/backend-educase.git
   cd backend-educase
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=your_port
PORT=3000

4. Start the server
```bash
   npm start
```

## API Endpoints

### POST /addSchool
Adds a new school to the database.

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Chandigarh",
  "latitude": 30.7333,
  "longitude": 76.7794
}
```

**Response:**
```json
{
  "message": "School added.",
  "id": 1
}
```

---

### GET /listSchools
Returns all schools sorted by distance from the user's location using the Haversine formula.

**Query Parameters:**
- `latitude` — user's latitude
- `longitude` — user's longitude

**Example Request:**
GET /listSchools?latitude=30.7333&longitude=76.7794

**Response:**
```json
{
  "userLocation": { "lat": 30.7333, "lng": 76.7794 },
  "total": 2,
  "schools": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Chandigarh",
      "latitude": 30.7333,
      "longitude": 76.7794,
      "distance_km": 0
    }
  ]
}
```

## Live API

Base URL: `mysql://root:yUKPkxTeGmfblyLoQECWIsEfKUkhJpsN@mainline.proxy.rlwy.net:44071/railway`

## Database

MySQL database hosted on Railway. Schema:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```
