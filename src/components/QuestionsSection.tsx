import React, { useEffect, useState } from "react";
import SlidePointer from "./SlidePointer";
import { useAppSelector } from "../hooks/store";

const QuestionsSection: React.FC = () => {
  const { currentQuestion } = useAppSelector((state) => state.questions);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState(currentQuestion);

  useEffect(() => {
    if (currentQuestion) {
      setIsAnimating(true);

      const timeout = setTimeout(() => {
        setDisplayedQuestion(currentQuestion);
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentQuestion]);

  if (!displayedQuestion) {
    return null;
  }

  return (
    <div
      className={`p-20 flex gap-20 items-center justify-start w-1/2  h-full transition-transform duration-300 ${
        isAnimating
          ? "transform -translate-y-full opacity-80"
          : "transform translate-y-0 opacity-100"
      }`}
    >
      <SlidePointer selected={displayedQuestion.id ?? 1} />
      <div className="w-2/4">
        <p className="font-bold text-5xl text-white">
          {displayedQuestion.title}
        </p>
      </div>
    </div>
  );
};

export default QuestionsSection;
