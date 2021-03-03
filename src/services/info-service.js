import axios from "axios";
import authHeader from "./auth-header";

const API_INFO = "http://localhost:8080/api/info/";
{/*
const infoRegister = (...inputList) => {
  return axios.post(API_INFO + "saveinfo", 
  inputList
  , {
    headers: authHeader()
  })
  .then((response) => {
    console.log("response.data[0]: "+response.data[0])
  })
  .catch((error) => {
    console.log("catch error: "+error)
  })
};
*/}

const infoRegister = (...inputList) => {
  return axios.post(API_INFO + "saveinfo", 
  inputList
  , {
    headers: authHeader()
  })
};
  export default {
    infoRegister,
  };