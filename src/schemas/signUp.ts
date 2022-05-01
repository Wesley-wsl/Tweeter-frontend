import * as yup from "yup";

const signUpFormSchema = yup.object({
    name: yup
        .string()
        .trim("Shouldn't have space in start and and.")
        .required("Name is required")
        .matches(
            /^[a-zA-Z\s\u00C0-\u00FF ]+$/,
            "Only alphabets are allowed for this field ",
        )
        .min(4, "Minimum 4 caracteres")
        .max(36, "Maximium 36 caracteres"),
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

export default signUpFormSchema;
