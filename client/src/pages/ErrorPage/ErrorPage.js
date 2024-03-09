import React from 'react';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Դուք առայժմ դասեր չունեք!</h1>
        </div>
    );
};

export default ErrorPage;