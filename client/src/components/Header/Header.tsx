import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.navigation}>
          <li className={classes.navItem}>
            <h3>Диспетчер</h3>
          </li>
          <li className={classes.navItem}>
            <p>Выход</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
