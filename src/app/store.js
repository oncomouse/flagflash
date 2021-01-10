import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from '../features/score/scoreSlice';
import questionReducer from '../features/question/questionSlice';

export default configureStore({
  reducer: {
    score: scoreReducer,
    question: questionReducer
  }
});
