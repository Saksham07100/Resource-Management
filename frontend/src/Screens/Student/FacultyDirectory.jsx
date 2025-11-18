import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineOfficeBuilding, HiOutlineSearch } from "react-icons/hi";
import { baseApiURL } from "../../baseUrl";

const dummyFaculties = [
  {
    firstName: "Rajesh",
    middleName: "Kumar",
    lastName: "Sharma",
    email: "rajesh.sharma@college.edu",
    department: "Computer Science",
    post: "Professor",
    cabinNumber: "A-301",
    mobileNumber: "+91 98765 43210",
    phoneNumber: 9876543210,
    experience: 15,
  },
  {
    firstName: "Priya",
    middleName: "Singh",
    lastName: "Patel",
    email: "priya.patel@college.edu",
    department: "Computer Science",
    post: "Associate Professor",
    cabinNumber: "A-305",
    mobileNumber: "+91 98765 43211",
    phoneNumber: 9876543211,
    experience: 10,
  },
  {
    firstName: "Amit",
    middleName: "Nath",
    lastName: "Verma",
    email: "amit.verma@college.edu",
    department: "Electronics",
    post: "Assistant Professor",
    cabinNumber: "B-201",
    mobileNumber: "+91 98765 43212",
    phoneNumber: 9876543212,
    experience: 8,
  },
  {
    firstName: "Sneha",
    middleName: "Devi",
    lastName: "Gupta",
    email: "sneha.gupta@college.edu",
    department: "Mathematics",
    post: "Professor",
    cabinNumber: "C-101",
    mobileNumber: "+91 98765 43213",
    phoneNumber: 9876543213,
    experience: 20,
  },
  {
    firstName: "Vikram",
    middleName: "Singh",
    lastName: "Rao",
    email: "vikram.rao@college.edu",
    department: "Physics",
    post: "Associate Professor",
    cabinNumber: "D-202",
    mobileNumber: "+91 98765 43214",
    phoneNumber: 9876543214,
    experience: 12,
  },
  {
    firstName: "Anjali",
    middleName: "Kumari",
    lastName: "Mishra",
    email: "anjali.mishra@college.edu",
    department: "Computer Science",
    post: "Lecturer",
    cabinNumber: "A-308",
    mobileNumber: "+91 98765 43215",
    phoneNumber: 9876543215,
    experience: 5,
  },
  {
    firstName: "Rahul",
    middleName: "Kumar",
    lastName: "Singh",
    email: "rahul.singh@college.edu",
    department: "Electronics",
    post: "Professor",
    cabinNumber: "B-105",
    mobileNumber: "+91 98765 43216",
    phoneNumber: 9876543216,
    experience: 18,
  },
  {
    firstName: "Kavita",
    middleName: "Devi",
    lastName: "Joshi",
    email: "kavita.joshi@college.edu",
    department: "Chemistry",
    post: "Assistant Professor",
    cabinNumber: "E-301",
    mobileNumber: "+91 98765 43217",
    phoneNumber: 9876543217,
    experience: 7,
  },
];

const FacultyDirectory = () => {
  const [faculties, setFaculties] = useState(dummyFaculties);
  const [filteredFaculties, setFilteredFaculties] = useState(dummyFaculties);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getFaculties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterFaculties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedDepartment, faculties]);

  const getFaculties = () => {
    setIsLoading(true);
    // Try to fetch real data, but fall back to dummy data
    axios
      .get(`${baseApiURL()}/faculty/details/getAllFaculty`)
      .then((response) => {
        if (response.data.success && response.data.result.length > 0) {
          setFaculties(response.data.result);
          setFilteredFaculties(response.data.result);
        } else {
          // Use dummy data if no real data
          setFaculties(dummyFaculties);
          setFilteredFaculties(dummyFaculties);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // Use dummy data on error
        setFaculties(dummyFaculties);
        setFilteredFaculties(dummyFaculties);
        setIsLoading(false);
      });
  };

  const filterFaculties = () => {
    let filtered = faculties;

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (faculty) => faculty.department === selectedDepartment
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (faculty) =>
          faculty.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faculty.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFaculties(filtered);
  };

  const departments = [...new Set(faculties.map((f) => f.department))];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="bg-indigo-100 p-3 rounded-full">
            <HiOutlineUser className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Faculty Directory</h2>
            <p className="text-gray-500">Contact information and cabin details</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="w-full md:w-1/3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredFaculties && filteredFaculties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculties.map((faculty, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
                    {faculty.firstName[0]}{faculty.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {faculty.firstName} {faculty.middleName} {faculty.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{faculty.post}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <HiOutlineOfficeBuilding className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{faculty.department}</span>
                  </div>

                  {faculty.cabinNumber && faculty.cabinNumber !== "Not Assigned" && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <HiOutlineOfficeBuilding className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">Cabin: {faculty.cabinNumber}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-gray-600">
                    <HiOutlineMail className="w-5 h-5 text-gray-400" />
                    <a
                      href={`mailto:${faculty.email}`}
                      className="text-sm hover:text-indigo-600 truncate"
                    >
                      {faculty.email}
                    </a>
                  </div>

                  {faculty.mobileNumber && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <HiOutlinePhone className="w-5 h-5 text-gray-400" />
                      <a
                        href={`tel:${faculty.mobileNumber}`}
                        className="text-sm hover:text-indigo-600"
                      >
                        {faculty.mobileNumber}
                      </a>
                    </div>
                  )}

                  {faculty.phoneNumber && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <HiOutlinePhone className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{faculty.phoneNumber}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Experience: {faculty.experience} years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-xl">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <HiOutlineUser className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Faculty Found</h3>
          <p className="text-gray-500 text-center max-w-md">
            {searchTerm || selectedDepartment !== "all"
              ? "No faculty members match your search criteria."
              : "No faculty data available at the moment."}
          </p>
        </div>
      )}
    </div>
  );
};

export default FacultyDirectory;
