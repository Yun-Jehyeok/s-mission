import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'router/App';
import store from 'store';

import 'antd/dist/antd.css';
import './index.css';
import loadUser from 'components/auth/loadUser';
import { history } from 'store';

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
