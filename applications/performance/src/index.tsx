/**
 * PC 首页入口
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './public-path';

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  // console.log('vue app bootstraped')
}

export async function mount(props) {
  // console.log('props from main framework', props)
  render();
}

export async function unmount() {
  //
}
