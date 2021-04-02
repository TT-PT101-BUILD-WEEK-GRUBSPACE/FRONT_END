import * as yup from "yup";

const signUpSchema = yup.object().shape({
  user_username: yup
    .string()
    .required("Please provide a username")
    .min(2, "username must be at least two characters long"),
  user_email: yup.string().required("Please provide an email address"),
  user_password: yup
    .string()
    .required("please choose a password")
    .min(6, "please choose a password between 6-12 characters long")
    .max(12,"please choose a password between 6-12 characters long" )
});

export default signUpSchema;
