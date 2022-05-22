import { ReactElement, FC } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Toast from '../Toast/Toast';
import styles from './Layout.module.css';

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Toast />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
