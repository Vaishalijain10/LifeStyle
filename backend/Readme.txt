BACKEND STEPS
------------------------------------------------------------------------------------------------
npx nodemon app.js -> to start nodemon
npm run start -> to start single backend
-------------------------------------------------------------------------------------
1. npm init -y
2. npm i express nodemon mongoose dotenv cors body-parser  nodemailer crypto
3. package.json ->  "start": "node app.js", "dev": "nodemon backend/app.js"  and  "type": "module",
4. create app.js and .env
5. create config folder -> dbconfig.js -> used for configuration
6. created Models used for database Schema -> User.js -> registered User
7. springedge or fast-two-sms  -> use to send sms through node.js -> BOTH PAID VERSION
    nodemailer -> 
        Create a module for Nodemailer.
        Integrate email sending in the registration route.
        Add a verification endpoint to handle email verification.
        Update the user model to include verification fields.
        Secure the login route to allow only verified users.
8.




work -
backend - nodemailer, password hashing (bcrypt)
fronend - redux setup, 
