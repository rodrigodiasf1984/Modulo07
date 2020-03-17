import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Routes from './routes';
import history from './services/history';
import store from './store';
import GlobalStyles from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
