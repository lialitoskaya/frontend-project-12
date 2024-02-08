import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from './App';

const MainPage = () => {
  const { t } = useTranslation();
  const { setContext, context } = useContext(AuthContext);

  const logOutHandler = () => {
    localStorage.clear();
    setContext(null);
  };

  return (
    <div className="d-flex flex-column h-100 ">
      <nav className="navbar p-3 shadow navbar-light bg-light mb-5">
        <a className="navbar-brand font-monospace" href="/">
          {t('mainPage.header')}
        </a>
        {context && (
        <button type="button" className="btn btn-outline-primary font-monospace" onClick={logOutHandler}>
          {t('mainPage.logout')}
        </button>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default MainPage;
