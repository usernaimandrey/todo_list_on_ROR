// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App/App.jsx';
import store from './slices/index.js';
import AuthProvider from './AuthProvider.jsx'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
