import React, { useCallback, useEffect } from "react";
import { useAppSelector } from "../hooks/store";

const Result: React.FC = () => {
  const { questionArray } = useAppSelector((state) => state.questions);

  const submitData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questions: questionArray }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Submission successful:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }, [questionArray]);

  useEffect(() => {
    submitData();
  }, [submitData]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col justify-center items-center px-4">
      <h1 className="font-bold text-3xl mb-8 animate-fade-in-up">
        Thank you for completing the survey 😊
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <p className="font-bold text-xl mb-4 text-center animate-fade-in-up">
          Your answers are:
        </p>
        <ul className="space-y-4">
          {questionArray.map((question, index) => (
            <li
              key={question.id}
              className="p-4 bg-gray-700 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="font-bold">
                {question.id}. {question.title}
              </span>
              <br />
              <span className="italic text-gray-300">
                {question.answer || "No answer provided"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
