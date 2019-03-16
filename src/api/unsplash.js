import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID f5816073876ea168ad0f2c30c45c395f24f8793d7a39604710b315c839f333a0"
  }
});
