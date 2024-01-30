import * as yup from 'yup';

const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/;
export const vendorSignupSchema = yup.object().shape({
  name: yup
  .string()
  .min(2, "First name must be at least 2 characters")
  .max(20)
  .matches(/^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/, "Only alphabets are allowed")
  .required("Please Enter Your Name"),
  email: yup.string().email("Please enter a valid email").required("Please Enter Email  "),
  mobile: yup
  .number("Phone number must be a 10-digit number")
  .positive("Phone number must be a positive number")
  .integer("Phone number must be an integer")
  .test("len", "Phone number should be a 10-digit number", (val) => {
    if (!val) {
      return false; // Treat empty values separately
    }
    const phoneNumber = /^\d{10}$/;
    return phoneNumber.test(val);
  })
  .typeError("Invalid phone number format")
  .required("Please Enter Mobile Number"),
  password: yup
    .string()
    .min(5, "Password should contain 5-16 characters")
    .max(16, "Password should contain 5-16 characters")
    .matches(
      passwordRule,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 5-16 characters long."
    )
    .required(" Please Enter Password"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Please Confirm passoword"),
});
