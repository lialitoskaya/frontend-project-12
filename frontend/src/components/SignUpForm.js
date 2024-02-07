import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from './App';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { authorizationSchema } from '../util/yupSchema';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { setContext } = useContext(AuthContext);
  const inputName = useRef();

  useEffect(() => {
    inputName.current.focus();
  }, [inputName]);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: authorizationSchema,
    onSubmit: async ({ username, password }) => {
      try {
        const res = await axios.post('/api/v1/signup', { username, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setContext(localStorage);
        navigate('/', { replace: false });
      } catch (e) {
        if (e.name === 'AxiosError') {
          e.response.status === 409
            ? formik.setErrors({ axios: t('signUpForm.errors.notUniqUser') })
            : formik.setErrors({ axios: t('axiosError') });
        }
      }
    },
  });

  const classNames = (inputName) => cn('form-control', {
    'is-invalid': !!(
      (formik.errors[inputName] && formik.touched[inputName])
        || formik.errors.axios
    ),
  });

  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-5 shadow p-5 ">
        <h2 className="text-center">{t('signUpForm.header')}</h2>
        <div className="my-3 position-relative form-floating">
          <input
            id="username"
            ref={inputName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
            className={classNames('username')}
            placeholder="Имя"
          />
          <label htmlFor="name">{t('signUpForm.username')}</label>
          {formik.errors.username && (
            <div className="invalid-tooltip">{formik.errors.username}</div>
          )}
        </div>
        <div className="mb-3 form-floating">
          <input
            onBlur={formik.handleBlur}
            className={classNames('password')}
            id="password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label htmlFor="password">{t('signUpForm.password')}</label>
          {formik.errors.password && (
            <div className="invalid-tooltip">{formik.errors.password}</div>
          )}
        </div>
        <div className="mb-3 form-floating">
          <input
            onBlur={formik.handleBlur}
            className={classNames('confirmPassword')}
            id="confirmPassword"
            placeholder="Подтвердите пароль"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <label htmlFor="confirmPassword">
            {t('signUpForm.confirmPassword')}
          </label>
          {formik.errors.confirmPassword && (
            <div className="invalid-tooltip">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>
        <button
          type="submit"
          onClick={formik.handleSubmit}
          className="btn btn-outline-primary w-100"
        >
          {t('signUpForm.btnSubmit')}
        </button>
        {formik.errors.axios && (
          <div className="text-danger mt-3">{formik.errors.axios}</div>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
