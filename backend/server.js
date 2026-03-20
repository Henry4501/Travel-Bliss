const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "###",
  user: "postgres",       
  password: "###",
  database: "travelbliss", 
  port: 5432,             
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to PostgreSQL successfully at:", res.rows[0].now);
  }
});

app.post("/book", (req, res) => {
  const { name, email, phone_no, gender, travel_date, destination, add_notes } = req.body;

  
  const sql = `INSERT INTO info 
  (name, email, phone_no, gender, travel_date, destination, add_notes)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;

  const values = [name, email, phone_no, gender, travel_date, destination, add_notes];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      res.status(500).json({ message: "Database error" });
    } else {
      console.log("Data inserted successfully");
      res.json({ message: "Booking successful!" });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
