import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkAnswer,
  question,
  selectQuestion
} from './questionSlice';
import styles from './Question.module.css';
import states from '../../states.json';
import Flag from './Flag';

const Question = () => {
  const { answer, options } = useSelector(selectQuestion);
  const dispatch = useDispatch();
  if (answer === null) {
    dispatch(question());
  }

  const choice = ev => {
    ev.preventDefault();
    const option = ev.target.getAttribute('id');
    dispatch(checkAnswer(parseInt(option, 10)));
  };

  return (
    <div>
      <Flag state={answer} />
      <ul className={styles.choices}>
        {
          options.map((option, i) => (
            <Answer states={states} option={option} key={i} id={i} onClick={choice} className={styles.choice} />
          ))
        }
      </ul>
    </div>
  );
};

const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const Answer = ({ states, option, ...props }) => has(states, option) ? (
  <li {...props}>{states[option]}</li>
) : (null);

export default Question;
// vim:ft=javascriptreact
