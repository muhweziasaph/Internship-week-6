# MERN To-Do App with Authentication
## Overview
This project is a **MERN stack To-Do app** with full authentication:  
- First-time users register with **email + phone**.  
- A temporary token is sent via **email** for first-time login.  
- Users set their own password after first login.  
- Returning users login with email + password.  
- Forgot password functionality is supported via email token.  
- The app seeds default tasks for new users.  
## Changes i made from the same app at local development while deploying
- Replaced mongodb_URI in .env from local to my Atlas connection string
- Replaced mailtrap(sandbox) that was used for testing in developement to real provider sendGrid in production for registered emails to receive real emails of token
- backend made to serve the react build by inserting the link in backend server.js after building frontend ,thats is 
    - in frontend while still locally,
         - cd frontend_todo_list_app in commandline
         - install react-router-dom axios
         - npm run build
         - remove node_modules and commit the rest
    - add link in backend server.js to serve the frontend react build
        - app.use(express.static(path.join(__dirname, "..", "frontend_todo_list_app", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend_todo_list_app", "build", "index.html"));
});
- made my JWT_SECRET strong.
- Installed SendGrid in backend
    - npm install @sendgrid/mail
- changed the function of email sending in authRoutes.js to ensure all tokens and password reset links will be sent via SendGrid instead of Mailtrap/Gmail.
    - const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM, 
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    throw new Error("Failed to send email");
  }
};
## Environment variables used in deployment, 
- PORT=5000
- MONGO_URI= MongoDB Atlas Connection String
- JWT_SECRET= strongJWTSecret
- SENDGRID_API_KEY=SendGrid api key
- FROM_EMAIL=verified gmail by sendgrid
## Deployment procedure
- At Render,created new workspace, dashboard → New → Web Service.
- Connected  GitHub repository withthe project to deploy thats is [Internship-week-6.](https://github.com/muhweziasaph/Internship-week-6.git) in public git repository,
- created a project by setting the following:
    - Name: mern-todo-app
    - environment name:production
- further settings
    - language:node
    - Branch: main
    - region:Oregon(USA West)
    - Root Directory:my_to_do_app_final_project - Copy/backend
- Build Command:my_to_do_app_final_project - Copy/backend/ $ npm install
- start command:my_to_do_app_final_project - Copy/backend/ $ node server.js
- Environment: Node
- Environment Variables: added my production .env variables.

