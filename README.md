# 📚 Library Management API

A simple RESTful API for managing a library catalog where **admins** can manage books and **members** can view and borrow them.  
Built with **Node.js** and **Express**, using an in-memory data store (JavaScript arrays) – perfect for learning, demos, and hackathons.

---

## ✨ Features

- 👤 **User roles**
  - **Admin**: manage books (CRUD), view borrowing info
  - **Member**: browse catalog, borrow and return books

- 📘 **Book Management (Admin)**
  - Create, read, update, delete books
  - Track availability status

- 🔍 **Filtering & Search (Members/Admin)**
  - Filter books by:
    - `author`
    - `genre`
    - `category`
    - `available` (true/false)
  - Text search by book name (and optionally author/genre)
  - Pagination with `page` and `limit` query parameters

- 📖 **Borrowing System**
  - Borrow a book (marks as unavailable)
  - Return a book (marks as available)
  - Store borrower info so admin can see:
    - user id
    - name
    - email

- 🧪 Simple and easy to run
  - In-memory “database” (`src/database/memory.js`)
  - No external DB needed

---

## 🏗 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** JavaScript (ES Modules)
- **Data Store:** In-memory arrays (no external DB)
- **Dev Tools:** Nodemon (optional, for hot reload)

---

## 📁 Project Structure

> Adjust this section if your structure is slightly different.

```bash
Library_Management_API/
│
├── package.json
├── package-lock.json
├── .gitignore
│
└── src/
    ├── server.js          # Entry point – starts the HTTP server
    ├── app.js             # Express app setup, middleware, routes
    │
    ├── database/
    │   └── memory.js      # In-memory data: books, users, borrows, etc.
    │
    ├── routes/
    │   ├── books.routes.js    # Routes for book CRUD & listing
    │   ├── borrow.routes.js   # Routes for borrowing/returning
    │   └── auth.routes.js     # (Optional) auth routes if implemented
    │
    ├── controllers/
    │   ├── books.controller.js   # Logic for books (getBooks, createBook, etc.)
    │   ├── borrow.controller.js  # Logic for borrow/return
    │   └── auth.controller.js    # (Optional) login/register logic
    │
    ├── middleware/
    │   ├── logger.js         # Request logging
    │   └── auth.js           # Role-based access control (admin/member)
    │
    └── models/               # (Optional) JS model helpers / DTOs

1. Clone the repository
git clone https://github.com/TusarKhatri/Library_Management_API.git
cd Library_Management_API


2. Install dependencies
npm install


3. Environment variables (optional)

If you use any environment variables (e.g., PORT), create a .env file:
PORT=5000


4. Run the server
# Production style
npm start

# or (if you have nodemon configured)
npm run dev
By default the API will run on:
http://localhost:5000


🔗 API Endpoints

Prefix shown here as /api — adjust if your app.js uses a different base path.

📘 Books
1. Get all books (with filters & pagination)

GET /api/books

Query Parameters (optional):

author – filter by exact author name (case-insensitive)

genre – filter by genre

available – true or false

search – text search (e.g., book name, maybe author)

page – page number (default: 1)

limit – results per page (default: 5)


Example:
GET /api/books?author=rowling&available=true&page=1&limit=10

2. Get a single book by ID

GET /api/books/:id

3. Create a new book (Admin only)

POST /api/books

Body (JSON):

{
  "name": "The Pragmatic Programmer",
  "author": "Andrew Hunt, David Thomas",
  "genre": "Programming",
  "category": "Technology",
  "availability": true
}

4. Update a book (Admin only)

PUT /api/books/:id

Body can include any updatable fields, for example:

{
  "name": "The Pragmatic Programmer (20th Anniversary Edition)",
  "availability": false
}

5. Delete a book (Admin only)

DELETE /api/books/:id

📖 Borrowing
6. Borrow a book

POST /api/books/:id/borrow

Body (JSON):

{
  "userId": 123,
  "name": "Alice Johnson",
  "email": "alice@example.com"
}


Marks the book as unavailable

Stores borrower information so admins can see who borrowed which book

7. Return a book

POST /api/books/:id/return

Marks the book as available

Clears borrower info for that book (depending on your implementation)

👤 Authentication & Roles (optional / if implemented)

If you’ve implemented auth, your endpoints might look like:

POST /api/auth/register

POST /api/auth/login

And your auth middleware might:

Verify JWT / token

Attach req.user with role (admin / member)

Restrict admin routes (create, update, delete books, view detailed borrower info)

Update this section to match your actual implementation.

🧪 Example Request (using cURL)

Get all available programming books:

curl "http://localhost:5000/api/books?genre=programming&available=true&page=1&limit=5"


Create a new book as admin (assuming token-based auth, example only):

curl -X POST "http://localhost:5000/api/books" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token-here>" \
  -d '{
    "name": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Programming",
    "category": "Technology",
    "availability": true
  }'

🚀 Future Improvements

Replace in-memory data with a real database (MongoDB / PostgreSQL / MySQL)

Add proper authentication (JWT, password hashing, etc.)

Add validation (e.g. using Joi or zod)

Add tests (Jest / Supertest)

Add Swagger/OpenAPI documentation


📄 License
This project is currently for learning and practice purposes.
Feel free to fork and modify for your own use.
