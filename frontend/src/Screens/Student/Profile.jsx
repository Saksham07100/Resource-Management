import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserData } from "../../redux/actions";
import { baseApiURL } from "../../baseUrl";
import toast from "react-hot-toast";
import { HiOutlineUserCircle, HiOutlineLockClosed, HiOutlineMail, HiOutlinePhone, HiOutlineAcademicCap, HiOutlineIdentification } from "react-icons/hi";
import { motion } from "framer-motion";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [initials, setInitials] = useState("");

  // Function to get initials from name
  const getInitials = (firstName, middleName, lastName) => {
    const first = firstName ? firstName.charAt(0) : '';
    const middle = middleName ? middleName.charAt(0) : '';
    const last = lastName ? lastName.charAt(0) : '';
    return `${first}${middle}${last}`.toUpperCase();
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { enrollmentNo: router.state.loginid },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user[0]);
          const nameInitials = getInitials(
            response.data.user[0].firstName,
            response.data.user[0].middleName,
            response.data.user[0].lastName
          );
          setInitials(nameInitials);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              semester: response.data.user[0].semester,
              enrollmentNo: response.data.user[0].enrollmentNo,
              branch: response.data.user[0].branch,
            })
          );
        } else {
          toast.error(response.data.message);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [dispatch, router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    if (!password.current || !password.new) {
      toast.error("Please fill in all fields");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL()}/student/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
          setShowPass(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {data && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Profile Image Section */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="relative h-48 w-48 rounded-full overflow-hidden group">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
                    
                    {/* Glass morphism effect */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>
                    
                    {/* Main content */}
                    <div className="relative h-full w-full flex items-center justify-center">
                      <span className="text-white text-6xl font-bold drop-shadow-lg">
                        {initials}
                      </span>
                    </div>
                    
                    {/* Glowing border */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse"></div>
                  </div>
                  
                  {/* User icon overlay */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full shadow-lg">
                    <HiOutlineUserCircle className="w-6 h-6" />
                  </motion.div>
                </div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-800 mt-4"
                >
                  {data.firstName} {data.middleName} {data.lastName}
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-500"
                >
                  Student
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Personal Information Section */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <div className="space-y-4">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300"
                >
                  <div className="bg-blue-100 p-3 rounded-full">
                    <HiOutlineIdentification className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Enrollment Number</p>
                    <p className="font-medium">{data.enrollmentNo}</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300"
                >
                  <div className="bg-purple-100 p-3 rounded-full">
                    <HiOutlineAcademicCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Branch & Semester</p>
                    <p className="font-medium">{data.branch} • Semester {data.semester}</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300"
                >
                  <div className="bg-pink-100 p-3 rounded-full">
                    <HiOutlinePhone className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">+91 {data.phoneNumber}</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300"
                >
                  <div className="bg-green-100 p-3 rounded-full">
                    <HiOutlineMail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{data.email}</p>
                  </div>
                </motion.div>
              </div>

              {/* Password Change Section */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPass(!showPass)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
                >
                  <HiOutlineLockClosed className="w-5 h-5" />
                  <span className="font-medium">
                    {!showPass ? "Change Password" : "Cancel Password Change"}
                  </span>
                </motion.button>

                {showPass && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Handle password change here
                    }}
                    className="mt-4 space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                <input
                  type="password"
                  value={password.current}
                        onChange={(e) => setPassword({ ...password, current: e.target.value })}
                        placeholder="Enter your current password"
                        className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                <input
                  type="password"
                  value={password.new}
                        onChange={(e) => setPassword({ ...password, new: e.target.value })}
                        placeholder="Enter your new password"
                        className="w-full px-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                  type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                      Update Password
                    </motion.button>
                  </motion.form>
                )}
              </motion.div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
