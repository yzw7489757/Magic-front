/**
 * @author Kuitos
 * @since 2019-05-16
 */

import React from 'react';
import style from './index.less';

export default function Framework(props) {
  const { content, loading } = props;

  function goto(title, href) {
    window.history.pushState({}, title, href);
  }

  return (
    <>
      <header className={style.header}>
        <nav>
          <ol>
            <li><a onClick={() => goto('home', '/')}>Home</a></li>
            <li><a onClick={() => goto('apps', '/apps')}>Apps Management</a></li>
          </ol>
        </nav>
      </header>
      {loading ? <div>loading...</div> : null}
      <div dangerouslySetInnerHTML={{ __html: content }} className={style.appContainer}/>
    </>

  );
}
