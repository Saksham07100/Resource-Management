import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  HiOutlineUserCircle, 
  HiOutlineCalendar, 
  HiOutlineClipboardList, 
  HiOutlineBookOpen, 
  HiOutlineBell,
  HiOutlinePlusCircle,
  HiOutlineChatAlt2,
  HiOutlineUsers
} from "react-icons/hi";
import { motion } from "framer-motion";
import AddMaterial from "./AddMaterial";
import ChatBot from "../../components/ChatBot";
import FacultyDirectory from "./FacultyDirectory";
import Attendance from "./Attendance";
import { useTheme } from "../../context/ThemeContext";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const menuItems = [
    { name: "My Profile", icon: HiOutlineUserCircle },
    { name: "Timetable", icon: HiOutlineCalendar },
    { name: "Marks", icon: HiOutlineClipboardList },
    { name: "Attendance", icon: HiOutlineClipboardList },
    { name: "Material", icon: HiOutlineBookOpen },
    { name: "Add Material", icon: HiOutlinePlusCircle },
    { name: "Notice", icon: HiOutlineBell },
    { name: "Faculty Directory", icon: HiOutlineUsers },
    { name: "Chat Tutor", icon: HiOutlineChatAlt2 }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-950' : 'bg-white'
    }`}>
      {load && (
        <>
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {/* Sidebar Navigation */}
              <div className="md:col-span-1">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`rounded-3xl shadow-lg p-8 backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-900 border border-gray-800' 
                      : 'bg-white'
                  }`}
                >
                  <h2 className={`text-2xl font-bold mb-8 ${
                    isDarkMode ? 'text-gray-100' : 'text-slate-900'
                  }`}>Dashboard</h2>
                  <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        onClick={() => setSelectedMenu(item.name)}
                      >
                        <div 
                          className={`flex items-center gap-4 px-6 py-4 cursor-pointer rounded-2xl transition-all duration-300 ${
                            selectedMenu === item.name
                              ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg"
                              : isDarkMode
                              ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                              : "hover:bg-gray-50 text-slate-600"
                          }`}
                        >
                          <item.icon className={`w-6 h-6 ${
                            selectedMenu === item.name ? "text-white" : ""
                          }`} />
                          <span className={`text-lg ${
                            selectedMenu === item.name ? "text-white" : ""
                          }`}>
                            {item.name}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-3">
                <motion.div 
                  key={selectedMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-3xl shadow-lg p-8 min-h-[600px] backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-900 border border-gray-800' 
                      : 'bg-white'
                  }`}
                >
                  {selectedMenu === "My Profile" && <Profile />}
                  {selectedMenu === "Timetable" && <Timetable />}
                  {selectedMenu === "Marks" && <Marks />}
                  {selectedMenu === "Attendance" && <Attendance />}
                  {selectedMenu === "Material" && <Material />}
                  {selectedMenu === "Notice" && <Notice />}
                  {selectedMenu === "Add Material" && <AddMaterial />}
                  {selectedMenu === "Faculty Directory" && <FacultyDirectory />}
                  {selectedMenu === "Chat Tutor" && (
                    <ChatBot loginid={router.state?.loginid} />
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Home;
