import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
import { useLocation } from "react-router-dom";

const Attendance = () => {
  const router = useLocation();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getAttendanceData = () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };
    
    axios
      .post(
        `${baseApiURL()}/attendance/getAttendance`,
        { enrollmentNo: router.state.loginid },
        { headers }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setAttendanceData(response.data.attendance);
          if (response.data.attendance.length === 0) {
            toast.error("No attendance records found");
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to load attendance");
      });
  };

  useEffect(() => {
    getAttendanceData();
  }, []);

  const viewDetails = (attendance) => {
    setSelectedSubject(attendance);
  };

  const closeDetails = () => {
    setSelectedSubject(null);
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return "text-green-600 bg-green-50";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10">
      <Heading title="My Attendance" />
      
      {loading ? (
        <div className="w-full flex justify-center items-center mt-8">
          <p className="text-lg">Loading attendance...</p>
        </div>
      ) : selectedSubject ? (
        <div className="w-full mt-8">
          <button
            className="mb-4 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
            onClick={closeDetails}
          >
            ← Back to Overview
          </button>
          
          <div className="bg-white border-2 border-blue-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedSubject.subject}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">Branch</p>
                <p className="text-lg font-semibold">{selectedSubject.branch}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">Year / Semester</p>
                <p className="text-lg font-semibold">Year {selectedSubject.year} / Sem {selectedSubject.semester}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-600">Total Lectures</p>
                <p className="text-lg font-semibold">{selectedSubject.totalLectures}</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm text-gray-600">Lectures Attended</p>
                <p className="text-lg font-semibold">{selectedSubject.lecturesAttended}</p>
              </div>
              <div className={`p-4 rounded col-span-2 ${getAttendanceColor(selectedSubject.percentage)}`}>
                <p className="text-sm">Attendance Percentage</p>
                <p className="text-3xl font-bold">{selectedSubject.percentage}%</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Attendance Records</h3>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-blue-500 text-white">
                  <tr>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSubject.records.sort((a, b) => new Date(b.date) - new Date(a.date)).map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="border px-4 py-2">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                      <td className={`border px-4 py-2 font-semibold ${
                        record.status === 'Present' ? 'text-green-600' : 
                        record.status === 'Late' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {record.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mt-8">
          {attendanceData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No attendance records available</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attendanceData.map((attendance, index) => (
                  <div
                    key={index}
                    className="border-2 border-blue-500 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => viewDetails(attendance)}
                  >
                    <h3 className="text-xl font-bold mb-3 text-blue-600">
                      {attendance.subject}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <span className="font-semibold">Branch:</span> {attendance.branch}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Year:</span> {attendance.year} | 
                        <span className="font-semibold"> Semester:</span> {attendance.semester}
                      </p>
                      <div className="flex justify-between mt-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="text-lg font-bold">{attendance.totalLectures}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Attended</p>
                          <p className="text-lg font-bold text-green-600">
                            {attendance.lecturesAttended}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Percentage</p>
                          <p className={`text-lg font-bold ${
                            attendance.percentage >= 75 ? 'text-green-600' :
                            attendance.percentage >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {attendance.percentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Overall Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Subjects</p>
                    <p className="text-2xl font-bold">{attendanceData.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Attendance</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {attendanceData.length > 0
                        ? (
                            attendanceData.reduce((sum, att) => sum + parseFloat(att.percentage), 0) /
                            attendanceData.length
                          ).toFixed(2)
                        : 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Subjects Below 75%</p>
                    <p className="text-2xl font-bold text-red-600">
                      {attendanceData.filter(att => att.percentage < 75).length}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
