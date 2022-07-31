import React from 'react';
import ReactDOM from 'react-dom/client';
import MyProvider from './context/MyProvider';
import './app.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <MyProvider> <App /> </MyProvider>
);