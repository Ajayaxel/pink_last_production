import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/apiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const showToast = (message, type = "error") => {
        toast[type](message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleLogin = async () => {
        if (!emailId || !password) {
            showToast("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailId, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.message?.toLowerCase().includes("not found")) {
                    showToast("User not found.");
                } else if (data.message?.toLowerCase().includes("incorrect")) {
                    showToast("Incorrect email or password.");
                } else {
                    showToast(data.message || "Login failed.");
                }
                return;
            }

            showToast("Login successful!", "success");

            // Clear any existing user data first
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userData");
            localStorage.removeItem("isAuthenticated");

            // Store new authentication data
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id); // Use the actual user ID from response
            localStorage.setItem("userEmail", data.user.emailId);
            localStorage.setItem("userRole", data.user.role);
            localStorage.setItem("isAuthenticated", "true");
            
            // Store complete user data for easy access
            const userData = {
                id: data.user.id,
                emailId: data.user.emailId,
                role: data.user.role,
                token: data.token,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            
            // Add event to notify other parts of the app about login
            window.dispatchEvent(new CustomEvent('userLogin', { 
                detail: userData 
            }));
            
            navigate("/"); // Redirect to protected route
        } catch (error) {
            showToast("An unexpected error occurred.");
            console.error("Login error:", error.message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden relative">
            <ToastContainer />

            <button 
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl z-10"
                onClick={() => navigate(-1)}
            >
                &times;
            </button>

            <div className="md:w-[50%] lg:w-[60%] bg-black hidden md:block relative h-full overflow-hidden">
                <img src="/loginpageimg.png" alt="Fashion" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-[50%] lg:w-[40%] flex flex-col justify-center items-center px-6 sm:px-8 md:px-12 lg:px-16 h-full">
                <div className="text-center w-full max-w-md flex flex-col items-center">
                    <img src="/New logo her pride gold black  1.png" alt="Logo" className="h-[50px] w-auto" />
                    <h2 className="text-2xl font-semibold mt-[40px] mb-4">Welcome Back</h2>
                    <p className="text-gray-500">Please enter your credentials to access your account</p>
                </div>

                <div className="mt-6 w-full max-w-md">
                    <label className="block text-gray-600">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none hover:border-[#C29256] hover:shadow-lg transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>

                <div className="mt-4 w-full max-w-md">
                    <label className="block text-gray-600">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border bg-gray-100 rounded mt-1 focus:outline-none hover:border-[#C29256] hover:shadow-lg transition-all"
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>

                <div className="flex justify-between items-center mt-4 w-full max-w-md">
                    <div>
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-gray-600">Remember me</label>
                    </div>
                    <a href="#" className="text-[#2563EB] text-sm">Forgot password?</a>
                </div>

                <button
                    className="w-full max-w-md bg-[#C29256] text-white py-2 rounded mt-6 hover:bg-[#C5892F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleLogin}
                    disabled={!emailId || !password}
                >
                    Login
                </button>

                <div className="flex items-center my-4 w-full max-w-md">
                    <div className="border-t w-full"></div>
                    <span className="px-3 text-gray-500">Or</span>
                    <div className="border-t w-full"></div>
                </div>

                <button className="w-full max-w-md border py-2 flex items-center justify-center gap-2 rounded hover:bg-gray-100 transition-all">
                    <img src="/Google.png" alt="Google" className="w-6 h-6" />
                    Login with Google
                </button>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#C5892F] font-semibold">Create an Account</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;