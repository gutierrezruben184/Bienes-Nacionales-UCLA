import axios from "axios";

const localhost = `localhost:9004`

export default axios.create({
  baseURL: `http://${localhost}/backend/webresources/`,
  responseType: "json"
});