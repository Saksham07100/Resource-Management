import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";

const Attendance = () => {
  const [subject, setSubject] = useState();
  const [branch, setBranch] = useState();
  const [studentData, setStudentData] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    year: "",
    subject: "",
  });

  const loadStudentDetails = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { branch: selected.branch, semester: selected.semester },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setStudentData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitAttendanceHandler = () => {
    let container = document.getElementById("attendanceContainer");
    const students = [];
    
    container.childNodes.forEach((enroll) => {
      const statusElement = document.getElementById(enroll.id + "status");
      if (statusElement) {
        students.push({
          enrollmentNo: parseInt(enroll.id),
          status: statusElement.value
        });
      }
    });

    if (students.length === 0) {
      toast.error("No students to mark attendance for");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
    };

    toast.loading("Marking Attendance...");

    axios
      .post(
        `${baseApiURL()}/attendance/markBulkAttendance`,
        {
          students: students,
          subject: selected.subject,
          year: parseInt(selected.year),
          semester: parseInt(selected.semester),
          branch: selected.branch,
          date: selectedDate
        },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setStudentData(null);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const markAllPresent = () => {
    let container = document.getElementById("attendanceContainer");
    container.childNodes.forEach((enroll) => {
      const statusElement = document.getElementById(enroll.id + "status");
      if (statusElement) {
        statusElement.value = "Present";
      }
    });
  };

  const markAllAbsent = () => {
    let container = document.getElementById("attendanceContainer");
    container.childNodes.forEach((enroll) => {
      const statusElement = document.getElementById(enroll.id + "status");
      if (statusElement) {
        statusElement.value = "Absent";
      }
    });
  };

  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getSubjectData = () => {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getBranchData();
    getSubjectData();
  }, []);

  const resetValueHandler = () => {
    setStudentData();
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast.error("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile);

    toast.loading("Uploading attendance...");

    try {
      const response = await axios.post(
        `${baseApiURL()}/attendance/uploadCSV`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.results.errors.length > 0) {
          console.log("Upload errors:", response.data.results.errors);
        }
        setShowUploadModal(false);
        setUploadFile(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to upload file");
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = `enrollmentNo,subject,year,semester,branch,date,status
101,Data Structures,2,3,Computer Science Engineering,2024-11-01,Present
102,Data Structures,2,3,Computer Science Engineering,2024-11-01,Absent
103,Data Structures,2,3,Computer Science Engineering,2024-11-01,Present
101,Operating Systems,2,3,Computer Science Engineering,2024-11-02,Present
102,Operating Systems,2,3,Computer Science Engineering,2024-11-02,Late`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_sample.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Mark Attendance`} />
        <div className="flex gap-2">
          {!studentData && (
            <button
              className="flex justify-center items-center border-2 border-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-50"
              onClick={() => setShowUploadModal(true)}
            >
              📤 Upload CSV
            </button>
          )}
          {studentData && (
            <button
              className="flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
              onClick={resetValueHandler}
            >
              <span className="mr-2">
                <BiArrowBack className="text-red-500" />
              </span>
              Close
            </button>
          )}
        </div>
      </div>

      {/* CSV Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Upload Attendance CSV</h2>
            <p className="text-gray-600 mb-4">
              Upload a CSV file with attendance records. The file should include:
              enrollmentNo, subject, year, semester, branch, date, and status.
            </p>
            
            <div className="mb-4">
              <button
                className="text-blue-500 underline mb-2"
                onClick={downloadSampleCSV}
              >
                📥 Download Sample CSV
              </button>
            </div>

            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mb-4 w-full border-2 border-gray-300 rounded p-2"
            />

            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
                onClick={handleFileUpload}
              >
                Upload
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex-1"
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!studentData && (
        <>
          <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="branch" className="leading-7 text-base ">
                Select Branch
              </label>
              <select
                id="branch"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {branch &&
                  branch.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.name}>
                        {branch.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="year" className="leading-7 text-base ">
                Select Year
              </label>
              <select
                id="year"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.year}
                onChange={(e) =>
                  setSelected({ ...selected, year: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="semester" className="leading-7 text-base ">
                Select Semester
              </label>
              <select
                id="semester"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.semester}
                onChange={(e) =>
                  setSelected({ ...selected, semester: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="subject" className="leading-7 text-base ">
                Select Subject
              </label>
              <select
                id="subject"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.subject}
                onChange={(e) =>
                  setSelected({ ...selected, subject: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {subject &&
                  subject.map((subject) => {
                    return (
                      <option value={subject.name} key={subject.name}>
                        {subject.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="mt-6 w-full">
            <label htmlFor="date" className="leading-7 text-base ">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={selectedDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
            onClick={loadStudentDetails}
          >
            Load Student Data
          </button>
        </>
      )}
      {studentData && studentData.length !== 0 && (
        <>
          <p className="mt-4 text-lg">
            Mark Attendance for {selected.subject} - {selected.branch} Year{" "}
            {selected.year} Semester {selected.semester} on {selectedDate}
          </p>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
              onClick={markAllPresent}
            >
              Mark All Present
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
              onClick={markAllAbsent}
            >
              Mark All Absent
            </button>
          </div>
          <div
            className="w-full flex flex-wrap justify-center items-center mt-8 gap-4"
            id="attendanceContainer"
          >
            {studentData.map((student) => {
              return (
                <div
                  key={student.enrollmentNo}
                  className="w-[30%] flex justify-between items-center border-2 border-blue-500 rounded"
                  id={student.enrollmentNo}
                >
                  <p className="text-lg px-4 w-1/2 bg-blue-50">
                    {student.enrollmentNo}
                  </p>
                  <select
                    className="px-6 py-2 focus:ring-0 outline-none w-1/2"
                    id={`${student.enrollmentNo}status`}
                    defaultValue="Present"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </div>
              );
            })}
          </div>
          <button
            className="bg-blue-500 px-6 py-3 mt-8 mx-auto rounded text-white"
            onClick={submitAttendanceHandler}
          >
            Submit Attendance
          </button>
        </>
      )}
    </div>
  );
};

export default Attendance;
