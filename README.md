1)
Simple Calculator
A lightweight and user-friendly web-based calculator built using HTML, CSS, and JavaScript. This calculator supports basic arithmetic operations such as addition, subtraction, multiplication, and division.

🚀 Technologies Used
HTML: Structures the calculator interface and includes input and button elements for user interaction.
CSS: Enhances the design with a responsive layout, color gradients, and hover effects to improve usability.
JavaScript: Implements calculator logic, handles user input, performs arithmetic operations, and updates the display dynamically.
🎯 Features
✔️ Simple and clean UI
✔️ Basic arithmetic operations (+, -, ×, ÷)
✔️ Real-time input display
✔️ Clear button to reset calculations
✔️ Responsive design for different screen sizes

🛠️ How It Works
Click the number buttons to enter values.
Select an operator (+, -, ×, ÷) to perform calculations.
Click "=" to compute the result.
Use the "Clear" button to reset the calculator.
📂 Project Structure
bash
Copy
Edit
/calculator-app
│── index.html  → Structure of the calculator  
│── style.css   → Styling and responsiveness  
│── script.js   → Logic and functionality  

2)
Project Management Application
A full-stack web application for managing projects with user authentication and status tracking.
Technologies Used
Backend

Node.js
Express.js
MongoDB (Database)
Mongoose (ODM)
JWT (Authentication)
Bcrypt.js (Password Hashing)
Cors (Cross-Origin Resource Sharing)
Dotenv (Environment Variables)

Frontend

React.js
Axios (HTTP Client)
localStorage (Token Storage)

Features

User Authentication (Register/Login)
Project CRUD Operations
Project Status Management
Protected Routes
JWT Token-based Security

Prerequisites

Node.js (v14+)
MongoDB
npm/yarn

Installation

Clone repository:

bashCopygit clone <repository-url>
cd project-management

Install backend dependencies:

bashCopycd backend
npm install

Install frontend dependencies:

bashCopycd frontend
npm install

Configure environment variables:
Create .env in backend directory:

CopyMONGODB_URI=mongodb://localhost:27017/projectmanager
JWT_SECRET=your_secret_key_here
PORT=5000
Running the Application

Start MongoDB:

bashCopymongod

Start backend:

bashCopycd backend
npm start

Start frontend:

bashCopycd frontend
npm start
Access the application at: http://localhost:3000
API Endpoints
Authentication

POST /api/register - Register new user
POST /api/login - User login

Projects

GET /api/projects - Get all projects
POST /api/projects - Create project
PUT /api/projects/:id - Update project
DELETE /api/projects/:id - Delete project

Project Structure
Copyproject-management/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── index.js
    └── package.json
