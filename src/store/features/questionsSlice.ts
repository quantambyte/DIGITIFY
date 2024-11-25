import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IQuestion } from "../../interfaces/Question";

interface QuestionState {
  currentQuestion: IQuestion | null;
  questionArray: IQuestion[];
}

const initialState: QuestionState = {
  currentQuestion: null,
  questionArray: [],
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setCurrentQuestion(state, action: PayloadAction<IQuestion | null>) {
      state.currentQuestion = action.payload;
    },
    setQuestionArray(state, action: PayloadAction<IQuestion[]>) {
      state.questionArray = action.payload;
    },
    initializeQuestions(state, action: PayloadAction<IQuestion[]>) {
      state.questionArray = action.payload;
      state.currentQuestion = action.payload[0] ?? null;
    },
  },
});

export const { setCurrentQuestion, setQuestionArray, initializeQuestions } =
  questionSlice.actions;

export default questionSlice.reducer;
