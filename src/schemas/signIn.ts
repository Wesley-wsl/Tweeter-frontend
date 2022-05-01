import * as yup from "yup";

const signInFormSchema = yup.object({
    email: yup
        .string()
        .trim("Shouldn't have space in start and and.")
        .required("Email is required!")
        .email("Email must be valid!"),
    password: yup
        .string()
        .trim("Shouldn't have space in start and and.")
        .required("Password is required!")
        .min(5, "Minimum 5 caracteres")
        .max(18, "Maximium 18 caracteres"),
});

export default signInFormSchema;
