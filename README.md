# Travel-Bliss  
A sample travel booking website  

## Travel Bliss  

This project is a simple booking website that demonstrates how a frontend form interacts with a backend server and stores booking information in a PostgreSQL database.  

---

## Technologies Used
- HTML / CSS / JavaScript (Frontend)  
- Node.js with Express (Backend)  
- PostgreSQL (Database)  

---

## Project Workflow  

### Step 1: Run the Website  
Open the `index.html` file in your browser.  

### Step 2: Website Interface  
A booking website interface will appear where users can enter booking details.  

### Step 3: Open Project in VS Code  
Open the project folder using Visual Studio Code.  

### Step 4: Navigate to Backend Folder  

cd backend

### Step 5: Start PostgreSQL Database  
Start PostgreSQL using pgAdmin or system services.

**Steps:**
1. Open pgAdmin  
2. Connect to your PostgreSQL server (localhost)  
3. Enter your password  

**To verify PostgreSQL service:**
- Press `Windows + R`  
- Type `services.msc`  
- Check if PostgreSQL service is running  

---

### Step 6: Start Backend Server  

node server.js

### Step 7: Test the Booking System  
1. Open the website  
2. Enter booking details in the form  
3. Submit the form  

---

### Step 8: Verify Data in Database  
1. Open pgAdmin  
2. Navigate to database: `travel_booking`  
3. Go to **Schemas → public → Tables**  
4. Select table: `bookings`  
5. Right-click → **View/Edit Data → All Rows**  

You will see the booking data entered from the website.  

## Project Structure
project-folder/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── backend/
    ├── server.js
    └── package.json

