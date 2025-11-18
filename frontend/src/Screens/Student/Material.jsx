import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar, HiOutlineSearch, HiOutlineBookOpen } from "react-icons/hi";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const dummyMaterials = {
  "Data Structures": [
    {
      title: "Data Structures Mid-Sem Question Paper 2024",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Sharma",
      link: "https://example.com/ds-midsem-2024.pdf",
      type: "question-paper",
      createdAt: new Date("2024-10-15T10:30:00"),
    },
    {
      title: "Data Structures End-Sem Question Paper 2023",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Sharma",
      link: "https://example.com/ds-endsem-2023.pdf",
      type: "question-paper",
      createdAt: new Date("2023-12-05T14:00:00"),
    },
    {
      title: "Arrays and Linked Lists - Lecture Notes",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Sharma",
      link: "https://example.com/ds-notes-unit1.pdf",
      type: "notes",
      createdAt: new Date("2024-08-20T09:00:00"),
    },
    {
      title: "Trees and Graphs Assignment",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Sharma",
      link: "https://example.com/ds-assignment-2.pdf",
      type: "assignment",
      createdAt: new Date("2024-09-10T11:00:00"),
    },
  ],
  "Operating Systems": [
    {
      title: "Operating Systems Mid-Sem Question Paper 2024",
      subject: "Operating Systems",
      faculty: "Prof. Priya Patel",
      link: "https://example.com/os-midsem-2024.pdf",
      type: "question-paper",
      createdAt: new Date("2024-10-18T10:30:00"),
    },
    {
      title: "OS End-Sem Question Paper 2023",
      subject: "Operating Systems",
      faculty: "Prof. Priya Patel",
      link: "https://example.com/os-endsem-2023.pdf",
      type: "question-paper",
      createdAt: new Date("2023-12-08T14:00:00"),
    },
    {
      title: "Process Management Study Material",
      subject: "Operating Systems",
      faculty: "Prof. Priya Patel",
      link: "https://example.com/os-process-mgmt.pdf",
      type: "material",
      createdAt: new Date("2024-08-25T10:00:00"),
    },
    {
      title: "Memory Management - Complete Notes",
      subject: "Operating Systems",
      faculty: "Prof. Priya Patel",
      link: "https://example.com/os-memory-notes.pdf",
      type: "notes",
      createdAt: new Date("2024-09-05T12:00:00"),
    },
  ],
  "Database Management": [
    {
      title: "DBMS Mid-Sem Question Paper 2024",
      subject: "Database Management",
      faculty: "Dr. Amit Verma",
      link: "https://example.com/dbms-midsem-2024.pdf",
      type: "question-paper",
      createdAt: new Date("2024-10-20T10:30:00"),
    },
    {
      title: "SQL Query Practice Questions",
      subject: "Database Management",
      faculty: "Dr. Amit Verma",
      link: "https://example.com/dbms-sql-practice.pdf",
      type: "assignment",
      createdAt: new Date("2024-09-15T11:30:00"),
    },
    {
      title: "Normalization & ER Diagrams Notes",
      subject: "Database Management",
      faculty: "Dr. Amit Verma",
      link: "https://example.com/dbms-normalization.pdf",
      type: "notes",
      createdAt: new Date("2024-08-30T09:30:00"),
    },
  ],
  "Computer Networks": [
    {
      title: "Computer Networks Mid-Sem 2024",
      subject: "Computer Networks",
      faculty: "Prof. Vikram Rao",
      link: "https://example.com/cn-midsem-2024.pdf",
      type: "question-paper",
      createdAt: new Date("2024-10-22T10:30:00"),
    },
    {
      title: "CN End-Sem Question Paper 2023",
      subject: "Computer Networks",
      faculty: "Prof. Vikram Rao",
      link: "https://example.com/cn-endsem-2023.pdf",
      type: "question-paper",
      createdAt: new Date("2023-12-10T14:00:00"),
    },
    {
      title: "TCP/IP Protocol Suite Study Material",
      subject: "Computer Networks",
      faculty: "Prof. Vikram Rao",
      link: "https://example.com/cn-tcpip.pdf",
      type: "material",
      createdAt: new Date("2024-09-01T10:00:00"),
    },
  ],
};

const Material = () => {
  const [subject, setSubject] = useState();
  const [selected, setSelected] = useState();
  const [material, setMaterial] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  const getSubjectMaterial = () => {
    if (!selected || selected === "select") {
      toast.error("Please select a subject");
      return;
    }
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/material/getMaterial`,
        { subject: selected },
        { headers }
      )
      .then((response) => {
        if (response.data.success && response.data.material.length > 0) {
          setMaterial(response.data.material);
        } else {
          // Use dummy data if no real data available
          if (dummyMaterials[selected]) {
            setMaterial(dummyMaterials[selected]);
            toast.success(`Showing sample materials for ${selected}`);
          } else {
            setMaterial([]);
            toast.error("No material found for this subject");
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // Use dummy data on error
        if (dummyMaterials[selected]) {
          setMaterial(dummyMaterials[selected]);
          toast.success(`Showing sample materials for ${selected}`);
        } else {
          setMaterial([]);
          toast.error("Error fetching material");
        }
        setIsLoading(false);
      });
  };

  const onSelectChangeHandler = (e) => {
    setMaterial([]);
    setSelected(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="bg-blue-100 p-3 rounded-full">
            <HiOutlineBookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Study Material</h2>
            <p className="text-gray-500">Access your course materials and resources</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-3/4">
            <select
              value={selected}
              name="subject"
              id="subject"
              onChange={onSelectChangeHandler}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="select">-- Select Subject --</option>
              {subject &&
                subject.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={getSubjectMaterial}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <HiOutlineSearch className="w-5 h-5" />
            <span className="font-medium">Search Material</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : material && material.length > 0 ? (
        <div className="space-y-4">
          {material.reverse().map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 
                      className={`text-xl font-semibold text-gray-800 flex items-center gap-2 ${
                        item.link && "cursor-pointer hover:text-blue-600"
                      }`}
                      onClick={() => item.link && window.open(item.link)}
                    >
                      {item.title}
                      {item.link && <IoMdLink className="w-5 h-5" />}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-gray-600">
                        {item.subject} • {item.faculty}
                      </p>
                      {item.type && (
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          item.type === 'question-paper' ? 'bg-purple-100 text-purple-700' :
                          item.type === 'notes' ? 'bg-green-100 text-green-700' :
                          item.type === 'assignment' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type === 'question-paper' ? 'Question Paper' : 
                           item.type === 'notes' ? 'Notes' :
                           item.type === 'assignment' ? 'Assignment' : 'Material'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <HiOutlineCalendar className="w-4 h-4 mr-1" />
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : selected && selected !== "select" ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 rounded-xl">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <HiOutlineBookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Material Available</h3>
          <p className="text-gray-500 text-center max-w-md">
            There is no study material available for {selected} at the moment.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Material;
