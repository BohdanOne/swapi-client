import { FC } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: FC = ({}) => {
  return (
    <nav className={styles.nav}>
      <Link href='/'>Home</Link>
      <Link href='/list'>List</Link>
      <Link href='/favorites'>Favorites</Link>
      <Link href='/contact'>Contact</Link>
    </nav>
  );
};

export default Navbar;
