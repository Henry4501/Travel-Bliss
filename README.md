Travel Bliss

This project is a simple booking website that demonstrates how a frontend form interacts with a backend server and stores booking information in a PostgreSQL database.

Technologies used:

HTML / CSS / JavaScript (Frontend)

Node.js with Express (Backend)

PostgreSQL (Database)

PROJECT WORKFLOW

Step 1: Run the Website

Open the index.html file in your browser.

Step 2: Website Interface

A booking website interface will appear where users can enter booking details.

Step 3: Open Project in VS Code

Open the project folder using Visual Studio Code.

Step 4: Navigate to Backend Folder

Open the terminal in VS Code and run:
cd backend

Step 5: Start PostgreSQL Database

Start your PostgreSQL database using pgAdmin or PostgreSQL service.

Steps:

Open pgAdmin
Connect to your PostgreSQL server (usually localhost)
Enter your PostgreSQL password
To verify PostgreSQL service:
Press Windows + R

Type:
services.msc

Check if PostgreSQL service is running

Step 6: Start Backend Server

Run the following command in the terminal:
node server.js

You should see:

Server running on http://localhost:3000  
Connected to PostgreSQL Database

Step 7: Test the Booking System

Go to the website
Enter booking details in the form
Submit the form

Step 8: Verify Data in Database

Open pgAdmin and follow these steps:
Connect to your PostgreSQL server
Navigate to your database:
travel_booking

Open Schemas → public → Tables

Select table:
bookings

Right-click → View/Edit Data → All Rows
You will see the booking data entered from the website.

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
Technologies Used

Node.js
Express.js
PostgreSQL
pgAdmin

Visual Studio Code
