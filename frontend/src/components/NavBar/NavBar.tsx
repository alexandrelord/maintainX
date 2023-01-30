import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={classes.nav}>
            <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : classes.link)}>
                Home
            </NavLink>
            <NavLink to="/workorders" className={({ isActive }) => (isActive ? classes.active : classes.link)}>
                Work Orders
            </NavLink>
            <NavLink to="/new" className={({ isActive }) => (isActive ? classes.active : classes.link)}>
                New Work Order
            </NavLink>
            <NavLink to="/productivity" className={({ isActive }) => (isActive ? classes.active : classes.link)}>
                Productivity
            </NavLink>
        </nav>
    );
};

export default NavBar;
