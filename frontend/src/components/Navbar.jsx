import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { motion } from "framer-motion";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`shadow-xl transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <RxDashboard className={`h-8 w-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-white'
                }`} />
              </div>
              <div className="ml-3">
                <h1 className={`text-xl font-bold ${
                  isDarkMode ? 'text-gray-100' : 'text-white'
                }`}>
                  {router.state && router.state.type} Dashboard
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`flex items-center justify-center p-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <HiOutlineSun className="h-6 w-6" />
              ) : (
                <HiOutlineMoon className="h-6 w-6" />
              )}
            </motion.button>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className={`flex items-center px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="font-medium">Logout</span>
              <FiLogOut className="ml-2 h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
