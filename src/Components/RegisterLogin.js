import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../api/apiService";

const RegisterLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Email regex for simple validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Allow only digits in phone number
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!emailRegex.test(formData.emailId)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.emailId,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:7000/api/auth/google", "_self");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <div className="flex flex-col md:flex-row h-screen overflow-hidden relative bg-gray-50">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 bg-black relative h-full">
          <img
            src="/loginpageimg.png"
            alt="Fashion"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center px-6 sm:px-8 md:px-12 lg:px-16 h-full overflow-auto">
          <div className="text-center w-full max-w-sm flex flex-col items-center">
            <img
              src="/New logo her pride gold black  1.png"
              alt="Logo"
              className="h-10 w-auto"
            />
            <h2 className="text-xl font-semibold mt-4">Create an Account</h2>
            <p className="text-gray-500">Please enter your details to create an account</p>
          </div>

          {/* Input Fields */}
          <div className="mt-6 w-full max-w-sm space-y-4">
            <div>
              <label className="block text-gray-600">First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#C29256]"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#C29256]"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600">Email Address</label>
              <input
                name="emailId"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#C29256]"
                value={formData.emailId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#C29256]"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={15} // optional max length
              />
            </div>

            <div>
              <label className="block text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#C29256]"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#C29256]"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Create Account Button */}
          <button
            onClick={handleSubmit}
            className="w-full max-w-sm bg-[#C29256] text-white py-2 rounded mt-6 hover:bg-[#a87742] transition-all"
          >
            Create an Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-4 w-full max-w-sm">
            <div className="border-t w-full"></div>
            <span className="px-3 text-gray-500">Or</span>
            <div className="border-t w-full"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full max-w-sm border py-2 flex items-center justify-center gap-2 rounded hover:bg-gray-100 transition-all"
          >
            <img src="/Google.png" alt="Google" className="w-6 h-6" />
            Login with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center mt-4">
            Have an account?{" "}
            <span
              className="text-[#C29256] font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in!
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterLogin;
