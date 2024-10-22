FRONT END  -> npx create-react-app . or npx create-react-app foldername 
-------------------------------------------------------
to start -> npm start
--------------------------------------------------------
1. npm i react-router-dom antd axios 
2. import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  in app.js
3. created folder -> Pages , api , components , Style
4. rfc -> in all pages -> react functional components
5. installing tailwind css in react ->
    npm install -D tailwindcss
    npx tailwindcss init
6. created NavBar, footer -> components and pages -> register, login and forgot password

------- new aim-------------
7.  npm i react-redux
8.  npm i @reduxjs/toolkit
9.  stores setup -> statemanagement globally -> store in the form of slices (features - add to cart, users-loggedIn, )
Single source of truth -> is what state Management is all about 
-> prop-drilling is good for simple projects upto one or two level 
2 methods used -> useSelectors and useDispatch 

data persist -> redis 










------------------------------------------------------------------
REACT  THINKS LEARNT ->
1. useNavigate from "react-router-dom"
2. importing images 
3. using Link tag to navigate from "react-router-dom". example ->  <Link to="/login"> Login </Link>