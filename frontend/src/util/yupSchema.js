import * as yup from 'yup';
import i18n from './i18n';

const schema = (channelsNames) => yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('chatPage.channels.errors.required'))
    .min(3, i18n.t('chatPage.channels.errors.nameLength'))
    .max(22, i18n.t('chatPage.channels.errors.nameLength'))
    .notOneOf(channelsNames, i18n.t('chatPage.channels.errors.notUniqName')),
});

export const authorizationSchema = yup.object().shape({
  username: yup
    .string()
    .required(i18n.t('signUpForm.errors.required'))
    .min(3, i18n.t('signUpForm.errors.usernameLength'))
    .max(20, i18n.t('signUpForm.errors.usernameLength')),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, i18n.t('signUpForm.errors.passwordLength')),
  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], i18n.t('signUpForm.errors.confirmPassword')),
});

export default schema;
