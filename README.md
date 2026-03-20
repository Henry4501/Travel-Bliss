# Travel-Bliss
A sample travel booking website
# Travel Bliss

This project is a simple booking website that demonstrates how a frontend form interacts with a backend server and stores booking information in a MySQL database.

Technologies used:
- HTML / CSS / JavaScript (Frontend)
- Node.js with Express (Backend)
- MySQL (Database)

------------------------------------------------------------

PROJECT WORKFLOW

Step 1: Run the Website
Open the "index.html" file in your browser.

Step 2: Website Interface
A booking website interface will appear where users can enter booking details.

Step 3: Open Project in VS Code
Open the project folder using Visual Studio Code.

Step 4: Navigate to Backend Folder
Open the terminal in VS Code and run:

cd backend

Step 5: Start MySQL Database
Start your MySQL database using MySQL Workbench.

Steps:
1. Open MySQL Workbench
2. Connect to localhost
3. Enter your MySQL password

To verify MySQL service:
1. Press Windows + R
2. Type:

services.msc

3. Check if MySQL service is running.

------------------------------------------------------------

Step 6: Start Backend Server

Run the following command in the terminal:

node server.js

You should see:

Server running on http://localhost:3000  
Connected to MySQL Database

------------------------------------------------------------

Step 7: Test the Booking System

1. Go to the website
2. Enter booking details in the form
3. Submit the form

------------------------------------------------------------

Step 8: Verify Data in Database

Open MySQL Workbench and follow these steps:

1. Connect to localhost
2. Go to Schemas
3. Select database:

travel_booking

4. Open Tables
5. Select table:

bookings

6. Click "Select Rows (Limit 1000)"

You will see the booking data entered from the website.

------------------------------------------------------------

PROJECT STRUCTURE

project-folder
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── backend
    ├── server.js
    └── package.json

------------------------------------------------------------

Technologies Used
- Node.js
- Express.js
- MySQL
- MySQL Workbench
- Visual Studio Code
