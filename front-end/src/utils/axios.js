import axios from "axios";

const noAuthAxios = () => {
  console.log("noAuthAxios Started");
  return axios.create({
    baseURL: "https://secret-family-recipes-101.herokuapp.com/api",
  });
};

export default noAuthAxios;
