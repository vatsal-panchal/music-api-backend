# 🎵 Music API Backend

A RESTful Music API built with Node.js, Express, MongoDB, and JWT-based authentication.  
Implements Role-Based Access Control (RBAC) for Users and Artists.

---

##  Features

- User & Artist role management
- Secure JWT Authentication
- Protected routes
- Artist-only music uploads
- Artist-only album creation
- Retrieve musics and albums
- MongoDB relational data using Mongoose populate

---

##  API Endpoints

###  Authentication
POST /api/auth/register  
POST /api/auth/login  
POST /api/auth/logout  

### 🎵 Music
POST /api/music/upload (Artist only)  
GET /api/music  

### 💿 Albums
POST /api/music/album (Artist only)  
GET /api/music/albums  
GET /api/music/albums/:albumId  
