import 'antd/dist/antd.min.css';
import React, { lazy, Suspense, useState, version } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';

const IS_PRO = process.env.NODE_ENV === 'production';
const User = lazy(() => import('./User'));

function App() {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? `${process.env.REACT_APP_ROUTER_BASE_URL || '/'}` : '/'}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/users" component={User} />
            <Route path="/" component={Home} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;
