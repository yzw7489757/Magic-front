/**
 * @author Kuitos
 * @since 2019-05-16
 */

import React from 'react';
import style from './index.less';

const applications = [
  { title: 'home', name: '主页', href: '/' },
  { title: 'apps', name: '应用管理', href: '/apps' },
  { title: 'performance', name: '性能监控', href: '/performance' },
];

function useForceUpdate() {
  const [, forceUpdate] = React.useState(0);
  return () => {
    forceUpdate(pre => pre + 1); // forceUpdate
  };
}
export default function Framework(props) {
  const { content, loading } = props;
  const forceUpdate = useForceUpdate();
  function goto(title, href) {
    window.history.pushState({}, title, href);
    forceUpdate();
  }

  const switchPath = href => {
    const currentApplicationPath = window.location.pathname.match(/\/\w+/);

    if (currentApplicationPath === null) {
      return href === '/' ? style.active : '';
    }
    return href === currentApplicationPath[0] ? style.active : '';
  };

  return (
    <>
      <header className={style.header}>
        <nav className={style.navbar}>
          <div className={style.header_title}>Magic</div>
          <ul className={style.header_navList}>
            {
              applications.map(app => (
              <li
                key={app.href}
                className={`${style.navItem} ${switchPath(app.href)}`}>
                 <a onClick={() => goto(app.title, app.href)}>{app.name}</a>
              </li>
              ))
            }
          </ul>
        </nav>
      </header>
      {loading ? <div>loading...</div> : null}
      <div dangerouslySetInnerHTML={{ __html: content }} className={style.appContainer}/>
    </>

  );
}
