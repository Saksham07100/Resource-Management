import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { baseApiURL } from "../baseUrl";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const { isDarkMode, toggleTheme } = useTheme();

  const onSubmit = (data) => {
    if (data.loginid && data.password) {
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data)
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response?.data?.message || "Login failed");
        });
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950' 
        : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
    }`}>
      {/* Theme Toggle Button - Top Right */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full shadow-xl transition-all duration-300 z-50 ${
          isDarkMode 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700' 
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg'
        }`}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? (
          <HiOutlineSun className="h-6 w-6" />
        ) : (
          <HiOutlineMoon className="h-6 w-6" />
        )}
      </motion.button>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl ${
          isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'
        }`}
      >
        <div className="md:w-1/2 hidden md:block relative overflow-hidden">
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-950/30 via-indigo-950/30 to-purple-950/30' 
              : 'bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10'
          }`}></div>
          <img
            src="https://img.freepik.com/free-vector/college-background-with-mortarboard_23-2147903630.jpg"
            alt="Login Illustration"
            className={`object-cover h-full w-full transform hover:scale-105 transition-transform duration-500 ${
              isDarkMode ? 'opacity-60' : ''
            }`}
          />
        </div>
        <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-center relative">
          <div className="absolute top-4 right-4 flex gap-4">
            {["Student", "Faculty", "Admin"].map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(role)}
                className={`text-sm font-semibold transition-all duration-300 px-3 py-1 rounded-full ${
                  selected === role
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-800 border border-gray-700"
                    : "text-slate-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {role}
              </motion.button>
            ))}
          </div>

          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl font-bold mb-8 ${
              isDarkMode ? 'text-gray-100' : 'text-slate-900'
            }`}
          >
            {selected} Login
          </motion.h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="loginid" className={`block font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}>
                {selected} Login ID
              </label>
              <input
                type="text"
                id="loginid"
                required
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-blue-500/20 focus:border-blue-500' 
                    : 'bg-gray-50 border-gray-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder={`Enter ${selected} ID`}
                {...register("loginid")}
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="password" className={`block font-medium mb-1 ${
                isDarkMode ? 'text-gray-300' : 'text-slate-700'
              }`}>
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:ring-blue-500/20 focus:border-blue-500' 
                    : 'bg-gray-50 border-gray-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder="Enter your password"
                {...register("password")}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
            >
              <span>Login</span>
              <FiLogIn className="ml-2" />
            </motion.button>
          </form>
        </div>
      </motion.div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
