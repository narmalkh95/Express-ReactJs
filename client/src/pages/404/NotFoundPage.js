import React from 'react';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.message}>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFoundPage;
