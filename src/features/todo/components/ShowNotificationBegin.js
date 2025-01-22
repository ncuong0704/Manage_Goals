import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ShowNotificationBegin = ({ openNotification, closeNotification }) => {
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
            className="blue"
          >
            Ghi nhớ
          </h2>
          <p>Nếu bạn nghĩ bạn thành công, bạn sẽ thành công.</p>
          <p>Nếu bạn nghĩ bạn giàu có, bạn sẽ giàu có.</p>
          <p>Nếu bạn nghĩ bạn khỏe mạnh, bạn sẽ khỏe mạnh.</p>
          <h2
            className="red"
          >
            Lưu ý
          </h2>
          <p>Đọc lại mục tiêu của năm.</p>
          <p>Lên các mục tiêu trong ngày.</p>
          <p>Hoàn thành các mục tiêu vì nó là lý do để bạn tồn tại. </p>
          <p>Vì bạn xứng đáng có một tương lai tốt đẹp hơn </p>
        </div>
      </div>
    </>
  );
};

ShowNotificationBegin.propTypes = {
  openNotification: PropTypes.bool.isRequired,
  closeNotification: PropTypes.func.isRequired,
};

export default ShowNotificationBegin;
