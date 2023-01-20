import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

type ActiveStyle = {
    isActive: boolean;
};

const NavBar = () => {
    // console.log('NavBar rendered');
    const activeLink = (style: ActiveStyle) => (style.isActive ? `${styles.active}` : `${styles.link}`);

    return (
        <nav className={styles.nav}>
            <NavLink to="/" className={activeLink}>
                Home
            </NavLink>
            <NavLink to="/workorders" className={activeLink}>
                Work Orders
            </NavLink>
            <NavLink to="/new" className={activeLink}>
                New Work Order
            </NavLink>
            <NavLink to="/productivity" className={activeLink}>
                Productivity
            </NavLink>
        </nav>
    );
};

export default NavBar;
