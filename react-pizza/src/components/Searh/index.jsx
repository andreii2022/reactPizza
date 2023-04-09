import React from 'react'

import styles from './Searh.module.scss';

const Searh = () => {
    return <input className={styles.root} placeholder='Поиск пиццы...' />;
};

export default Searh;