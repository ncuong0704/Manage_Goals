import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Please enter name Todo"),
  desc: yup.string().required("Please enter description Todo"),
});
