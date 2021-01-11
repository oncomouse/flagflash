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
export const selectLastAnswerState = state => state.score.lastAnswer;

export const { correct, incorrect } = scoreSlice.actions;
export default scoreSlice.reducer;
