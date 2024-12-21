import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

const ButtonConfirm = ({ message, name, removeCompleted, isTrash = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openConfirm = () => {
    setIsOpen(true);
  };

  const closeConfirm = () => {
    setIsOpen(false);
    removeCompleted();
  };
  return (
    <>
      <button
        className={classNames("todo__btn red", {
          todo__trash: isTrash,
        })}
        onClick={openConfirm}
      >
        <i className="fa-solid fa-trash-can"></i>
        {name}
      </button>
      <div className={classNames("modal", { active: isOpen })}></div>

      <div className={classNames("popup", { active: isOpen })}>
        <div className="form">
          <h2>Notification</h2>
          <p>{message}</p>
          <button className="form__submit todo__btn green" onClick={closeConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

ButtonConfirm.propTypes = {
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removeCompleted: PropTypes.func.isRequired,
  isTrash: PropTypes.bool,
};

export default ButtonConfirm;
