const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",       
  password: "postgres",
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

app.get("/bookings", (req, res) => {
  pool.query('SELECT * FROM info ORDER BY id DESC', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.json(result.rows);
    }
  });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
  pool.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error signing up. Email might already exist." });
    } else {
      res.json({ message: "Sign up successful!" });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT id, name, email FROM users WHERE email = $1 AND password = $2';
  pool.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    } else if (result.rows.length > 0) {
      res.json({ message: "Login successful!", user: result.rows[0] });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin123" && password === "123456") {
    res.json({ message: "Admin login successful!", role: "admin" });
  } else {
    res.status(401).json({ message: "Invalid admin credentials." });
  }
});

app.get("/my-bookings/:email", (req, res) => {
  const email = req.params.email;
  pool.query('SELECT * FROM info WHERE email = $1 ORDER BY id DESC', [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.json(result.rows);
    }
  });
});

app.delete("/bookings/:id", (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM info WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.json({ message: "Booking deleted successfully!" });
    }
  });
});

app.put("/bookings/:id", (req, res) => {
  const id = req.params.id;
  const { destination, travel_date, add_notes } = req.body;
  pool.query(
    'UPDATE info SET destination = $1, travel_date = $2, add_notes = $3 WHERE id = $4',
    [destination, travel_date, add_notes, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
      } else {
        res.json({ message: "Booking updated successfully!" });
      }
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});