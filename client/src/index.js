import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Test from './pages/Test';
import StockLookup from './pages/StockLookup';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(


  <React.StrictMode>
    <Auth0Provider domain="dev-gke9ssjh.us.auth0.com" clientId='Y4J1Q08vPrHxhtjlmNjE7Mgppew8KdRW' redirectUri={window.location.origin}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/lookup" element={<StockLookup />} />
            <Route path="/test2" element={<Test />} />
          </Route>
        </Routes>
      </Router>

    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
