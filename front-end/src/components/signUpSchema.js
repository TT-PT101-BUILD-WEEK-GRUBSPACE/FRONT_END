import * as yup from "yup";

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("Please provide a username")
    .min(2, "username must be at least two characters long"),
  email: yup.string().required("Please provide an email address"),
 password: yup.string().required("please choose a password").min(6, 'please choose a password between 6-8 characters long').max(8, 'please choose a password between 6-8 characters long')
});

export default signUpSchema;