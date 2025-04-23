import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload, FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const Timetable = () => {
  const [timetable, setTimetable] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const getTimetable = () => {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .get(
          `${baseApiURL()}/timetable/getTimetable`,
          { semester: userData.semester, branch: userData.branch },
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.length !== 0) {
            setTimetable(response.data[0].link);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          toast.dismiss();
          console.log(error);
          setIsLoading(false);
        });
    };
    userData && getTimetable();
  }, [userData, userData.branch, userData.semester]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="bg-blue-100 p-3 rounded-full">
            <FiCalendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Semester {userData.semester} Timetable
            </h2>
            <p className="text-gray-500">View your class schedule and timings</p>
          </div>
        </div>
        {timetable && (
          <button
            onClick={() => window.open(process.env.REACT_APP_MEDIA_LINK + "/" + timetable)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <FiDownload className="w-5 h-5" />
            <span className="font-medium">Download Timetable</span>
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : timetable ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <img
            className="w-full h-auto object-contain"
            src={process.env.REACT_APP_MEDIA_LINK + "/" + timetable}
            alt="timetable"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-xl">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <FiCalendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Timetable Available</h3>
          <p className="text-gray-500 text-center max-w-md">
            The timetable for your semester will be available soon. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default Timetable;
