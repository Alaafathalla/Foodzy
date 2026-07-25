import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AlertCircle } from "lucide-react";
import login from "../../assets/login.png";
import { authService } from "../../services";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    region: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region/State is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      await authService.register(values);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-2xl rounded-3xl px-8 py-8 space-y-6 overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-xl shadow-red-500/30">
            <img src={login} alt="Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white">Create Account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Join Foodzy today and start shopping</p>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Row 1: First + Last Name */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    First Name*
                  </label>
                  <Field
                    name="firstName"
                    placeholder="Enter your first name"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Last Name*
                  </label>
                  <Field
                    name="lastName"
                    placeholder="Enter your last name"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Phone Number*
                  </label>
                  <Field
                    name="phone"
                    placeholder="Enter your phone number"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Address
                </label>
                <Field
                  name="address"
                  placeholder="Address"
                  className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Row 3: City + Post Code */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    City*
                  </label>
                  <Field
                    name="city"
                    placeholder="City"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="postCode" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Post Code
                  </label>
                  <Field
                    name="postCode"
                    placeholder="Post Code"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Row 4: Country + Region */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Country*
                  </label>
                  <Field
                    name="country"
                    placeholder="Country"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Region/State*
                  </label>
                  <Field
                    name="region"
                    placeholder="Region/State"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="region" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Row 5: Password + Confirm Password */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Password*
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="At least 6 characters"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Confirm Password*
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg shadow-red-500/25"
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>

              {/* Login Redirect */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Have an account?{" "}
                <Link to="/login" className="text-red-500 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
