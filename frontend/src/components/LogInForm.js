import axios from 'axios';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from './App';
import cn from 'classnames';

const axiosLogIn = async ({ username, password }) => {
  const res = await axios.post('/api/v1/login', { username, password });
  return res.data;
};

const LogInForm = () => {
  const { t } = useTranslation();

  const { setContext } = useContext(AuthContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const data = await axiosLogIn(values);
        const { token } = data;
        if (token.length > 0) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', values.username);
          localStorage.setItem('password', values.password);
          setContext(localStorage);
          navigate('/', { replace: false });
        }
      } catch (e) {
        if (e.name === 'AxiosError') {
          e.response.status === 401 ? formik.setErrors({ axios: t('logInForm.error') }) : formik.setErrors({ axios: t('axiosError') });
        }
      }
    },
  });

  const classNames = cn('form-control', { 'is-invalid': formik.errors.axios });
  return (
    <div className="row justify-content-center">
      <div className=" col-md-4 p-0 shadow">
        <form
          className="px-5 pt-5 mb-3 "
          onSubmit={formik.handleSubmit}
        >
          <div className="form-floating mb-3">
            <input
              value={formik.values.username}
              onChange={formik.handleChange}
              id="username"
              className={classNames}
              placeholder={t('logInForm.login')}
            />
            <label htmlFor="username">{t('logInForm.login')}</label>
          </div>
          <div className="form-floating ">
            <input
              onChange={formik.handleChange}
              type="password"
              name="password"
              className={classNames}
              placeholder={t('logInForm.password')}
            />
            <label htmlFor="password">{t('logInForm.password')}</label>
            <div className="invalid-tooltip">
              {formik.errors.axios}
            </div>
          </div>
          <button type="submit" className={`mt-3 w-100 btn btn-outline-primary ${formik.isSubmitting && 'disabled'}`}>
            {t('logInForm.btnSubmit')}
          </button>
        </form>
        <hr className="w-100" />
        <div className="text-center pb-3">
          <span>
            {t('logInForm.footer.text')}
            {' '}
          </span>
          <a href="/signup">{t('logInForm.footer.href')}</a>
        </div>
      </div>
    </div>
  );
};
export default LogInForm;
