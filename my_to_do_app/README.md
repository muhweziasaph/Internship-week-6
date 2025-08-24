# To-Do List MERN App

##  Objective
This project is a simple **To-Do List application** built with the **MERN stack**(MongoDB, Express, React, Node.js).  
It allows users to add, view, update, and delete tasks while practicing **fullstack development** skills.
## Technologies Used
- **Frontend:** React (Create React App),axios, JSX
- **Backend:** Node.js, Express.js, MongoDB (Mongoose ODM)  
- **Database:** Local MongoDB  
- **Other Tools:** Git, Postman (for API testing)  
## Project Structure

### Frontend (React)
Located in the frontend/ folder:
- src/
  - index.js – React entry point  
  - App.js – Main component 
  - api.js - handles API calls to backend 
  - components/
    - Header.js – App header  
    - InputForm.js – Form to add tasks  
    - TaskItem.js – Individual task component  
    - TaskList.js – Renders list of tasks  
### Backend (Node.js + Express)
Located in the backend/ folder:
- server.js – Main server file  
- models/Task.js – Mongoose schema & model for tasks  
- routes/taskRoutes.js – API routes (CRUD endpoints)  
- config/db.js – Database connection  
- seed.js – Script for seeding initial data  
## How to run locally
- Clone the repository: https://github.com/muhweziasaph/Internship-week-6.git
navigate to the folder my_to_do_app
- however first install dependencies in both frontend and backend folders separately that's :
   - for backend, cd backend
   - npm install express mongoose cors dotenv
   - for frontend, cd frontend-todo-list-app
   - npm install react react-dom react-scripts axios
- back to the main folder my_to_do_app Install concurrently: npm install concurrently --save-dev
- run both folders once  with npm start.
- Backend will run on http://localhost:5000 
- Frontend → runs on http://localhost:3000 fetching data from locally installed mongodb
