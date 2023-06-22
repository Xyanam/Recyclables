import deleteIcon from "../../assets/icons/close.png";
import classes from "./TableButtonRemove.module.css";

const TableButtonRemove = ({ onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      <img src={deleteIcon} alt="delete" />
    </button>
  );
};

export default TableButtonRemove;
