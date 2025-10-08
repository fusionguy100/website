#  Library Management System (Full-Stack Application)

A full-stack web application that enables users to browse, borrow, and manage library books with secure payment processing powered by **Stripe**.  
Built with a **React** frontend and a **Spring Boot** backend, the project demonstrates RESTful API design, database management, and modern web architecture.

---

##  Features

###  Frontend (React)
- Responsive user interface built with **React** and **Tailwind CSS**
- **React Router** for seamless navigation across pages
- **Axios** for API communication with the backend
- **Stripe Checkout** integration for secure online payments

###  Backend (Spring Boot)
- RESTful API built with **Spring Boot 3**
- **Spring Data JPA** with **PostgreSQL** for persistence
- Authentication and validation with **Spring Security** (optional)
- Data transfer via **DTOs** and **MapStruct** mappers
- Handles CRUD operations for Books, Users, and Transactions

###  Stripe Integration
- Payment endpoint securely communicates with **Stripe API**
- Real-time transaction confirmation and status tracking
- Supports multiple currencies and test mode for development

---

##  System Overview

**Use Case Flow:**
1. Users browse available books through the frontend UI.  
2. They can borrow or purchase access by making a payment through **Stripe Checkout**.  
3. After successful payment, the backend updates the user’s library record and transaction history.  
4. Admins can manage book inventory and view payment logs.

---

##  Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, Tailwind CSS, React Router, Axios |
| **Backend** | Java 17, Spring Boot 3, Spring Data JPA, Spring Security, MapStruct, Lombok |
| **Database** | PostgreSQL |
| **Payments** | Stripe API |
| **Dev Tools** | Postman, Maven, IntelliJ IDEA, Git/GitHub |
| **Deployment** | Docker, Render / AWS (optional) |

---



