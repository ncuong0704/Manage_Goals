import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ShowNotification = ({ openNotification, message, title, status, closeNotification }) => {
  const closeConfirm = () => {
    closeNotification();
  };
  return (
    <>
      <div className={classNames("modal", { active: openNotification })}></div>
      <div className={classNames("popup", { active: openNotification })}>
        <div className="popup__close" onClick={closeConfirm}>
          <i className="fa-solid fa-xmark"></i>
        </div>
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
        </div>
      </div>
    </>
  );
};

ShowNotification.propTypes = {
  openNotification: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  closeNotification: PropTypes.func.isRequired,
};

export default ShowNotification;
