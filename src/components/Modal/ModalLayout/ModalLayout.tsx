import React from 'react';
import styles from './ModalLayout.module.scss';

export interface ModalLayoutProps {
  title: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const ModalLayout = ({ title, children, footerContent }: ModalLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.headerSection}>
          <h3>{title}</h3>
        </div>
        {children && <div className={styles.contentSection}>{children}</div>}
        <div className={styles.footerSection}>{footerContent}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
