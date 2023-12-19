import * as Yup from "yup";
const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/;
const adminLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordRule,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 5-16 characters long."
    )
    .required("Password is required"),
});

export default adminLoginSchema;
