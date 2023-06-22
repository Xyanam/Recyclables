import classes from "./TableButtonEdit.module.css";
import iconEdit from "../../assets/icons/edit.png";

const TableButtonEdit = ({ onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      <img src={iconEdit} alt="edit" />
    </button>
  );
};

export default TableButtonEdit;
