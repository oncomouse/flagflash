import { createSlice } from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    total: 0,
    correct: 0,
    lastAnswer: null
  },
  reducers: {
    correct: state => {
      state.total += 1;
      state.correct += 1;
      state.lastAnswer = true;
    },
    incorrect: state => {
      state.total += 1;
      state.lastAnswer = false;
    }
  }
});

export const selectScore = state => [state.score.correct, state.score.total];
export const selectLastAnswer = state => ({
  correct: state.score.lastAnswer,
  answer: state.question.history.length === 0 ? null : state.question.history[0]
});

export const { correct, incorrect } = scoreSlice.actions;
export default scoreSlice.reducer;
