
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store/store';
import AppRoutes from './routes';

if (document.getElementById('root')) {
  ReactDOM.render(
    (
      <Provider store={store}>
        <MuiThemeProvider>
          <AppRoutes />
        </MuiThemeProvider>
      </Provider>
    ),
    document.getElementById('root'),
  );
}
