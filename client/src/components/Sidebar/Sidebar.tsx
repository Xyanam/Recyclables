import { Link, useLocation } from "react-router-dom";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className={classes.sidebar}>
      <div className={classes.nav}>
        <div className={classes.navigation}>
          <Link
            to="/"
            className={`${
              location.pathname === `/`
                ? classes.navItemActive
                : classes.navItem
            }`}
          >
            <p>Заявки</p>
          </Link>
          <Link
            to="/catalog"
            className={`${
              location.pathname === `/catalog`
                ? classes.navItemActive
                : classes.navItem
            }`}
          >
            <p>Каталог</p>
          </Link>
          <Link
            to="/priem"
            className={`${
              location.pathname === `/priem`
                ? classes.navItemActive
                : classes.navItem
            }`}
          >
            Заказы
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
