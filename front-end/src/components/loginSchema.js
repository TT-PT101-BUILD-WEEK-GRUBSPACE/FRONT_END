import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "username must be at least two characters long")
    .required("Please provide a username"),
  password: yup
    .string()
    .min(6, "please choose a password between 6-15 characters long")
    .max(15, "please choose a password between 6-15 characters long")
    .required("please choose a password"),
});

export default loginSchema;