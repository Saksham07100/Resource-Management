import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";

const Marks = () => {
  const userData = useSelector((state) => state.userData);
  const [quiz1, setQuiz1] = useState();
  const [quiz2, setQuiz2] = useState();
  const [midSem, setMidSem] = useState();
  const [endSem, setEndSem] = useState();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/getMarks`,
        { enrollmentNo: userData.enrollmentNo },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data.Mark[0])
          setQuiz1(response.data.Mark[0].Quiz1);
          setQuiz2(response.data.Mark[0].Quiz2);
          setMidSem(response.data.Mark[0].midSem);
          setEndSem(response.data.Mark[0].endSem);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
      });
  }, [userData.enrollmentNo]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-10 mb-10">
      <div className="text-center mb-12">
        <Heading title={`Marks of Semester ${userData.semester}`} />
        <p className="text-gray-600 mt-2">View your Quizs, Mid Sem and End Sem examination scores</p>
      </div>

      {!quiz1 && !quiz2 && !midSem && !endSem? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center p-8 bg-gray-50 rounded-lg shadow-sm">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium text-gray-900">No Marks Available</p>
            <p className="text-gray-500 mt-2">Check back later for your examination results</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {quiz1 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">quiz1 Marks</h3>
                <p className="text-blue-100 text-sm">Maximum Score: 10</p>
              </div>
              <div className="p-6">
                {Object.keys(quiz1).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <p className="text-gray-700 font-medium">{item}</p>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-blue-600">{quiz1[item]}</span>
                      <span className="text-gray-400 text-sm ml-1">/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {quiz2 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">quiz2 Marks</h3>
                <p className="text-purple-100 text-sm">Maximum Score: 10</p>
              </div>
              <div className="p-6">
                {Object.keys(quiz2).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <p className="text-gray-700 font-medium">{item}</p>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-purple-600">{quiz2[item]}</span>
                      <span className="text-gray-400 text-sm ml-1">/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {midSem && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">midSem Marks</h3>
                <p className="text-purple-100 text-sm">Maximum Score: 30</p>
              </div>
              <div className="p-6">
                {Object.keys(midSem).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <p className="text-gray-700 font-medium">{item}</p>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-purple-600">{midSem[item]}</span>
                      <span className="text-gray-400 text-sm ml-1">/30</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endSem && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">endSem Marks</h3>
                <p className="text-purple-100 text-sm">Maximum Score: 50</p>
              </div>
              <div className="p-6">
                {Object.keys(endSem).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <p className="text-gray-700 font-medium">{item}</p>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-purple-600">{endSem[item]}</span>
                      <span className="text-gray-400 text-sm ml-1">/50</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marks;
