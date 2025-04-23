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
  HiOutlinePlusCircle
} from "react-icons/hi";
import { motion } from "framer-motion";
import AddMaterial from "./AddMaterial";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

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
    { name: "Material", icon: HiOutlineBookOpen },
    { name: "Add Material", icon: HiOutlinePlusCircle },
    { name: "Notice", icon: HiOutlineBell }
  ];

  return (
    <div className="min-h-screen bg-white">
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
                  className="bg-white rounded-3xl shadow-sm p-8"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Dashboard</h2>
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
                              ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className={`w-6 h-6 ${
                            selectedMenu === item.name ? "text-white" : "text-slate-600"
                          }`} />
                          <span className={`text-lg ${
                            selectedMenu === item.name ? "text-white" : "text-slate-600"
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
                  className="bg-white rounded-3xl shadow-sm p-8 min-h-[600px]"
                >
                  {selectedMenu === "My Profile" && <Profile />}
                  {selectedMenu === "Timetable" && <Timetable />}
                  {selectedMenu === "Marks" && <Marks />}
                  {selectedMenu === "Material" && <Material />}
                  {selectedMenu === "Notice" && <Notice />}
                  {selectedMenu === "Add Material" && <AddMaterial />}
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
