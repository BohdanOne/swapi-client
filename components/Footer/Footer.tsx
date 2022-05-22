import { FC } from 'react';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';
import styles from './Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <ColorSchemeToggle />
    </footer>
  );
};

export default Footer;
