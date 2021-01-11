import { createSlice } from '@reduxjs/toolkit';
import states from '../../states.json';
import { correct, incorrect } from '../score/scoreSlice';

const NUM_CHOICES = 5;

// Source: https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function getRandom (arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) { throw new RangeError('getRandom: more elements taken than available'); }
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle (array) {
  let currentIndex = array.length; let temporaryValue; let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    answer: null,
    options: Array(NUM_CHOICES).map(() => null),
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
