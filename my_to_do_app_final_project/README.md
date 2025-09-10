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
- package.json
- public/index.html
- src/
  - index.js – React entry point 
  - Styles.css 
  - App.js – Main component 
  - api.js - handles API calls to backend 
  - components/
    - Header.js – App header  
    - InputForm.js – Form to add tasks  
    - TaskItem.js – Individual task component  
    - TaskList.js – Renders list of tasks
    - landing.js  
    - signup.js
    - setpassword.js
    - login.js
    - forgotpassword.js
    - resetpassword.js
    
### Backend (Node.js + Express)
Located in the backend/ folder:
- package.json
- server.js – Main server file
- middleware/authmidlleware.js 
- models/Task.js – Mongoose schema & model for tasks
- models/user.js  
- routes/taskRoutes.js – API routes (CRUD endpoints)
- routes/authroutes.js
-  omitted is .env but vital . included in it are MONGO_URI=mongodb://127.0.0.1:27017/, todo_auth JWT_SECRET="your secretkey", EMAIL_HOST= your mailtrap host name eg, sandbox.smtp.mailtrap.io, EMAIL_PORT=your email port e.g 2525, EMAIL_USER=your use name on mailtrap and your EMAIL_PASS=your mailtrap sandbox password.
## How to run locally
- Clone the repository: https://github.com/muhweziasaph/Internship-week-6.git
navigate to the folder my_to_do_app_final_project
- however first install dependencies in both frontend and backend folders separately that's :
   - for backend, cd backend
   - npm install express mongoose cors dotenv bcryptjs jsonwebtoken nodemailer
   - npm install --save-dev nodemon
   - for frontend, cd frontend-todo-list-app
   - npm install react-router-dom axios
- back to the main folder my_to_do_app_final_project Install concurrently: npm install concurrently --save-dev
- run both folders once  with npm start.
- Backend will run on http://localhost:5000 
- Frontend → runs on http://localhost:3000 fetching data from locally installed mongodb



