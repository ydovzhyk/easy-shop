import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';

import Loader from 'components/Loader';
import './styles/styles.scss';

if (process.env.NODE_ENV === 'production') {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/easy-shop/">
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

if (process.env.NODE_ENV === 'development') {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}
