// axios -> help in giving and take
import axios from "axios";

const url = "http://localhost:1008/users";

export const RegisterUser = async (FormData) => {
  console.log("Reached register in basic.js -> frontend api")
  const response = await axios.post(url + "/register", FormData);
  return response.data;
};

// exporting in line 6

export const LoginUser = async (FormData) => {
    console.log("Reached login  in basic.js -> frontend api")
    const response = await axios.post(url + "/login", FormData);
    return response.data;
  };


