📚 Library Management REST API

A simple and clean Library Management System API built using Node.js, Express.js, and JWT authentication.
Admins can manage books, while members can view and borrow books.
Designed as part of a Hackathon project.

🚀 Features
👨‍💼 Admin Capabilities

Add new books

Update book details

Delete books

Full CRUD management for books

👤 Member Capabilities

Register & login

View all books

Filter books by:

Genre

Availability

Author

Paginate results

Borrow available books

🔐 Authentication & Authorization

JWT-based login system

Role-based access:

admin

member

🛠️ Tech Stack
Component	Technology
Runtime	Node.js
Framework	Express.js
Auth	JSON Web Token (JWT)
Password Hashing	bcrypt.js
Logging	morgan
Data Storage	In-memory (array-based)
📂 Project Structure
project/
│── src/
│   ├── controllers/
│   │   ├── bookController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── role.js
│   │   ├── logger.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── bookRoutes.js
│   │   ├── userRoutes.js
│   │   └── borrowRoutes.js
│   ├── database/
│   │   └── memory.js
│   ├── app.js
│   └── server.js
│
├── package.json
├── .gitignore
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/TusarKhatri/Library_Management_API.git
cd Library_Management_API

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
JWT_SECRET=your_jwt_secret
PORT=5000

4️⃣ Start the server
npm run dev


Server runs at:

http://localhost:5000

🔑 Authentication

Use these routes:

Register
POST /api/user/register


Body:

{
  "name": "John",
  "email": "john@test.com",
  "password": "123456",
  "role": "member"
}

Login
POST /api/user/login


Returns a JWT token:

{
  "token": "xxxxxx.yyyyy.zzzzz"
}


Add this token in headers for all protected routes:

Authorization: Bearer <token>

📘 Book API Endpoints
➤ Admin Routes
Add a new book
POST /api/book

Update book
PUT /api/book/:id

Delete book
DELETE /api/book/:id

➤ Member Routes
Get all books
GET /api/book

Get book by ID
GET /api/book/:id

Filter books
GET /api/book?genre=Tragedy
GET /api/book?availability=available
GET /api/book?author=Kiyosaki

Borrow book
POST /api/borrow/:id