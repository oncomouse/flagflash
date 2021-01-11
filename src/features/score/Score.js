import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectScore,
  selectLastAnswerState
} from './scoreSlice';
import {
  selectLastAnswer
} from '../question/questionSlice';
import styles from './Score.module.css';
import states from '../../states.json';

const Score = () => {
  const [correct, total] = useSelector(selectScore);
  if (total === 0) {
    return (<div />);
  }

  return (
    <div>
      <div className={styles.score}>
        <span className={styles.score__correct}>{correct}</span>
        <span className={styles.score__total}>{total}</span>
      </div>
      <LastAnswer />
    </div>
  );
};

const LastAnswer = () => {
  const correct = useSelector(selectLastAnswerState);
  const answer = useSelector(selectLastAnswer);
  if (correct === null) {
    return (<div />);
  }
  return correct
    ? (<div className={`${styles.answer} ${styles['answer--correct']}`}>Correct!</div>)
    : (<div className={`${styles.answer} ${styles['answer--incorrect']}`}>Incorrect! The answer was {states[answer]}</div>);
};

export default Score;
// vim:ft=javascriptreact
