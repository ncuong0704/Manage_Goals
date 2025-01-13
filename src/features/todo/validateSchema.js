import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập mục tiêu!"),
  desc: yup.string().required("Vui lòng nhập chi tiết mục tiêu!"),
  begin: yup.string().required("Vui lòng chọn thời gian bắt đầu!"),
  end: yup.string().required("Vui lòng chọn thời gian kết thúc!"),
});
