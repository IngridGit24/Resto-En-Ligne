# Resto-En-Ligne

Resto-En-Ligne is a full-stack restaurant management platform built with 
**Laravel** (backend) and **React** (frontend), containerized using **Docker**. 
It enables users to manage restaurants and menus, handle authentication, 
and scale with ease using modern web technologies.

## 🧰 Tech Stack

- **Frontend**: React + Vite + React Bootstrap + Axios
- **Backend**: Laravel (PHP 8.2) 
- **Database**: MySQL 
- **Containerization**: Docker 
- **State Management**: React Context API for Auth

## 🚀 Features

- ✅ User authentication (Login / Logout) using Laravel
- ✅ CRUD operations for:
  - Users
  - Restaurants
  - Menus
- ✅ API-based communication between frontend and backend
- ✅ Responsive UI with React Bootstrap
- ✅ Multi-container Docker setup with isolated frontend, backend, and DB

## 📁 Project Structure
Resto-En-Ligne/
 ├── frontend/ # React app (Vite-based) 
    ├── src/ 
    ├── Dockerfile 
    │ └── ... 
 ├── backend/ # Laravel app 
    ├── app/ │ 
    ├── Dockerfile 
    │ └── ... 
 ├── docker-compose.yml 
 └── README.md

## 🐳 Getting Started with Docker
> Ensure Docker is installed and running.

### 1. Build and Start Containers
```bash
    docker compose up --build -d
    docker exec -it backend php artisan migrate
## .env DB config
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=restoDB
DB_USERNAME=root
DB_PASSWORD=

Developed By
Ingrid Moudoungou — Intern at Digitech Africa
March 2025 - September 2025