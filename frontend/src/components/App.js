import { Routes, Route } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import { Provider } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Provider as RollbarProvaider, ErrorBoundary } from '@rollbar/react';
import LogInForm from './LogInForm';
import store from '../store.js';
import Chat from './ChatPage.js';
import SignUpForm from './SignUpForm.js';
import MainPage from './MainPage.js';

const rollbarConfig = {
  accessToken: '1ffa02bb4b8046bb8c7e27273e60f4aa',
  environment: 'production',
};

export const AuthContext = createContext({});

const App = () => {
  const [context, setContext] = useState(
    localStorage.token ? localStorage : null,
  );

  return (
    <RollbarProvaider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthContext.Provider value={{ context, setContext }}>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<MainPage />}>
                <Route
                  index
                  element={
                    context ? (
                      <Chat />
                    ) : (
                      <Navigate to="/login" replace={false} />
                    )
                  }
                />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LogInForm />} />
              </Route>
            </Routes>
          </Provider>
        </AuthContext.Provider>
      </ErrorBoundary>
    </RollbarProvaider>
  );
};

export default App;
