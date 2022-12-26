# Marketboard
Fullstack marketboard application.  Frontend based on Vue3 and backend based on express.js

# Starting guide
1) clone this repo
2) cd server
3) create .env file and set next vars:  
PORT=5000  
MONGODB_URL=mongodb://mongo:27017/marketboard  
CLIENT_URL=http://localhost:5173  
ACCESS_SECRET=YOUR_AUTH_ACCESS_SECRET  
REFRESH_SECRET=YOUR_AUTH_REFRESH_SECRET  
4) run npm install and docker-compose up --build
5) cd client
6) create .env file and set next vars:  
VITE_API_URL=http://localhost:5000/api  
7) run npm install and npm run dev

# Technologies used:
Frontend: Typescript, Vue3, Vite, Pinia, Axios, Scss, vee-validate
Backend: Javascript, NodeJs, ExpressJs, MongoDB, Mongoose, JWT, express-validator, Docker
