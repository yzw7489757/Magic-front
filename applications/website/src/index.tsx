/**
 * PC 首页入口
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log(`react demo is bootstrap`);
}

export async function mount(props) {
  console.log(props);
  render();
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
