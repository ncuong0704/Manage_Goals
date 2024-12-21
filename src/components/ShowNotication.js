import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const ShowNotification = ({ isOpenProp, message, title, status, closeNotification }) => {
  const closeConfirm = () => {
    closeNotification();
  };
  return (
    <>
      <div className={classNames("modal", { active: isOpenProp })}></div>
      <div className={classNames("popup", { active: isOpenProp })}>
        <div className="form">
          <h2
            className={classNames({
              blue: status,
              red: !status,
            })}
          >
            {title}
          </h2>
          <p>{message}</p>
          <button className="form__submit todo__btn green" onClick={closeConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

ShowNotification.propTypes = {
  isOpenProp: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  closeNotification: PropTypes.func.isRequired,
};

export default ShowNotification;
