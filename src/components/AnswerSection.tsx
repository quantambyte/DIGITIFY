import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../hooks/store";
import {
  setQuestionArray,
  setCurrentQuestion,
} from "../store/features/questionsSlice";
import { OPTIONS } from "../constant/Constant";

const AnswerSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questionArray, currentQuestion } = useAppSelector(
    (state) => state.questions
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClickOption = (title: string) => {
    if (!currentQuestion) return;

    const updatedArray = questionArray.map((question) =>
      question.id === currentQuestion.id
        ? { ...question, answer: title }
        : question
    );
    dispatch(setQuestionArray(updatedArray));

    const currentIndex = questionArray.findIndex(
      (question) => question.id === currentQuestion.id
    );
    const nextQuestion = questionArray[currentIndex + 1] || null;
    dispatch(setCurrentQuestion(nextQuestion));
  };

  return (
    <div className="flex text-7xl justify-center items-center bg-white gap-10 w-1/2 h-full">
      {OPTIONS.map((option, index) => (
        <div
          key={option.id}
          className="group relative cursor-pointer transform transition-transform duration-300"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => handleClickOption(option.title)}
          style={{
            transform: `scale(${
              hoveredIndex === index
                ? 1.5
                : hoveredIndex === index - 1 || hoveredIndex === index + 1
                ? 1.2
                : 1
            })`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <span>{option.emoji}</span>

          <span className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {option.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnswerSection;
