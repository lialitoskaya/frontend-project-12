import * as yup from "yup";
const schema = (channelsNames) => yup.object().shape({
    name: yup
      .string()
      .required("Поле должно быть заполнено")
      .min(3, "Название должно иметь от 3 до 20 символов")
      .max(22, "Название должно иметь от 3 до 22 символов")
      .notOneOf(channelsNames, "Канал с таким названием уже существует"),
});

export default schema;