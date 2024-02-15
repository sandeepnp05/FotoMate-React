    import React from "react";
    import { useDispatch } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import { adminLoginVerify } from "../../api/adminApi";
    import { toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import { useFormik } from "formik";
    import adminLoginSchema from "../../validations/user/adminLoginValidation";
    import { adminLogin } from "../../reduxStore/slices/adminSlice";

    function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
        const res = await adminLoginVerify(values);
        if (res?.status === 200) {
            const { token, userName } = res.data;
            localStorage.setItem("adminToken", token);
            dispatch(
            adminLogin({
                token: token,
                admin: userName,
            })
            );
            toast.success(res?.data?.message);
            navigate("/admin/dashboard");
        }
        } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error.message);
        }
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: adminLoginSchema,
        onSubmit,
        });
    return (
        <>
        <section className="h-screen">
            <div className="container h-full px-6 py-24">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                {/* Left column container with background*/}
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="w-full"
                    alt="Phone image"
                />
                </div>
                {/* Right column container with form */}
                <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                <form onSubmit={handleSubmit}>
                    {/* Email input */}
                    <h2 className="text-3xl font-semibold mb-6">Admin Login</h2>
                    <div className="relative mb-6" data-te-input-wrapper-init="">
                    <input
                        type="email"
                        name="email" // Add name attribute
                        className="peer block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput3"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {errors.email && touched.email && (
                        <p className="text-red-600">{errors.email}</p>
                    )}
                    <label
                        htmlFor="exampleFormControlInput3"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >
                        Email address
                    </label>
                    </div>
                    {/* Password input */}
                    <div className="relative mb-6" data-te-input-wrapper-init="">
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="peer block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput33"
                    />
                    {errors.password && touched.password && (
                        <p className="text-red-600">{errors.password}</p>
                    )}
                    <label
                        htmlFor="exampleFormControlInput33"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    >
                        Password
                    </label>
                    </div>

                    {/* Submit button */}
                    <button
                    // Assuming this is a form submit button, adjust the type accordingly
                    className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    style={{ backgroundColor: "#3b5998" }}
                    type="submit"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    >
                    Login
                    </button>
                </form>
                </div>
            </div>
            </div>
        </section>
        </>
    );
    }

    export default AdminLogin;
