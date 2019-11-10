import axios from "axios";

const localhost = `localhost:52694`

export default axios.create({
  baseURL: `http://${localhost}/backend/webresources/`,
  headers: {
      "Content-Type": "application/json",
    }
});