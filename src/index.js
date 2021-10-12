import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

