# Fullstack Blog Application

This is a full-stack blog application built with **React.js** for the frontend and **Spring Boot** for the backend. It allows users to register, login, create, view, update, and delete blog posts.

---

## 📁 Project Structure
fullstack-blog-project/
├── blog_frontend/ # React frontend (Vite or CRA)
└── blogcms/ # Spring Boot backend

## 🚀 Features

- User Authentication (JWT-based)
- Create, Read, Update, Delete (CRUD) blog posts
- Responsive UI with modern design
- RESTful API integration
- PostgreSQL Database integration
- Error handling and validations
- Modular and scalable folder structure

---

## 🔧 Technologies Used

### 🖥 Frontend – `blog_frontend/`
- React.js
- Axios
- React Router
- Tailwind CSS / CSS Modules / Bootstrap *(depending on your setup)*
- Vite / CRA (Create React App)

### ⚙️ Backend – `blogcms/`
- Spring Boot
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL
- Hibernate
- Lombok

---

## 🛠️ Setup Instructions

### 📌 Prerequisites

- Node.js and npm
- Java 17+ (for Spring Boot)
- PostgreSQL installed and running
- Git

---

### 💻 Frontend Setup

```bash
cd blog_frontend
npm install
npm run dev   # or npm start if CRA
```

cd blogcms
./mvnw spring-boot:run   # or use IntelliJ to run the main class

**application.properties**
spring.application.name=blogcms

spring.datasource.url=jdbc:postgresql://localhost:5432/blogcms
spring.datasource.username=postgres
spring.datasource.password=xxxx
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

jwt.secret=z8Jx7E9kAxm+P9kYy5u2wh7OAOoI2i+gyHHIweq9r6Q=
jwt.expiration=7200000
spring.datasource.default-auto-commit=false

API Endpoints 
POST /auth/register – Register user

POST /auth/login – Login & get JWT

GET /posts – Get all posts

POST /posts – Create post

PUT /posts/{id} – Update post

DELETE /posts/{id} – Delete post

GET /posts/{username} – Posts by author
