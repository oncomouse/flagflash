import React, { useState, useEffect } from 'react';
import styles from './Question.module.css';
const Flag = (props) => {
  const {
    state
  } = props;

  const [icon, setIcon] = useState('');

  useEffect(() => {
    const getFlag = async () => {
      const importedIcon = await import(`../../flags/${state.toLowerCase()}.svg`);
      setIcon(importedIcon.default);
    };
    getFlag();
  }, [state]);

  return (<img src={icon} alt='Which Flag is this?' className={styles.flag} />);
};
export default Flag;
// vim:ft=javascriptreact
