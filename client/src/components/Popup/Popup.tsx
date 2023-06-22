import classes from "./Popup.module.css";
import closeIcon from "../../assets/icons/close.png";

interface popupProps {
  popupTitle: string;
  children: React.ReactNode;
  buttonText: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup = ({
  popupTitle,
  children,
  buttonText,
  active,
  setActive,
  onClick,
}: popupProps) => {
  return (
    <div
      className={active ? classes.wrapperActive : classes.wrapper}
      onClick={() => setActive(false)}
    >
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        <div className={classes.contentHead}>
          <p>{popupTitle}</p>
          <div className={classes.close} onClick={() => setActive(false)}>
            <img src={closeIcon} alt="close" />
          </div>
        </div>
        <div className={classes.contentBody}>{children}</div>
        <div className={classes.contentFooter}>
          <button onClick={onClick}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
