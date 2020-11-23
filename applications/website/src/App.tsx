import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const IS_PRO = process.env.NODE_ENV === 'production';
const User = lazy(() => import('./views/User/index'));

console.log(process.env);
function App() {
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? `${process.env.ROUTER_BASE_URL || '/'}` : '/'}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/about" component={() => <div>about</div>} />
            <Route path="/users" component={User} />
            <Route path="/" component={() => <div>Home</div>} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
