import axios from "axios";

 const axiosWithAuth = () => {
  console.log('axiosWithAuth Started')
  const token = localStorage.getItem("token");
  console.log(token)
  return axios.create({
    //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3VzZXJuYW1lIjoiamltYm8iLCJpYXQiOjE2MTcwMzc2Mzh9.nhYSAG8vN9P3BVKs3H1_z_ul97idTz1fo7c4P3vFg98'
    baseURL: 'https://secret-family-recipes-101.herokuapp.com',
    headers: { authorization: token },
  });
};

export default axiosWithAuth
