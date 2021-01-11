import { createSlice } from '@reduxjs/toolkit';
import states from '../../states.json';
import { correct, incorrect } from '../score/scoreSlice';
import { shuffle, getRandom } from '../../app/utilities/random';

const NUM_CHOICES = 5;

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    answer: null,
    options: Array(NUM_CHOICES).fill(null),
    history: []
  },
  reducers: {
    question: state => {
      if (state.answer !== null) {
        state.history.unshift(state.answer);
      }
      const s = getRandom(Object.keys(states), NUM_CHOICES);
      state.answer = s[0];
      state.options = shuffle(s.slice());
    }
  }
});

export const { question } = questionSlice.actions;

export const selectQuestion = state => ({
  answer: state.question.answer,
  options: state.question.options
});

export const selectLastAnswer = state => state.question.history.length === 0 ? null : state.question.history[0];

export const checkAnswer = choice => (dispatch, getState) => {
  const { answer, options } = getState().question;
  if (options.indexOf(answer) === choice) {
    dispatch(correct());
  } else {
    dispatch(incorrect());
  }
  dispatch(question());
};

export default questionSlice.reducer;
