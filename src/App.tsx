import { useEffect } from "react";

import { initializeQuestions } from "./store/features/questionsSlice";
import QuestionsSection from "./components/QuestionsSection";
import { QUESTIONS } from "./constant/Constant";
import Result from "./components/Result";
import AnswerSection from "./components/AnswerSection";
import { useAppDispatch, useAppSelector } from "./hooks/store";

function App() {
  const dispatch = useAppDispatch();
  const { currentQuestion } = useAppSelector((state) => state.questions);

  useEffect(() => {
    dispatch(initializeQuestions(QUESTIONS));
  }, [dispatch]);

  return (
    <>
      {currentQuestion ? (
        <div className="flex h-screen bg-primary">
          <QuestionsSection />
          <AnswerSection />
        </div>
      ) : (
        <Result />
      )}
    </>
  );
}

export default App;
