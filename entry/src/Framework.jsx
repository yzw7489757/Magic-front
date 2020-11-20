import React from 'react';
import style from './index.less';
import Loading from './Loading';
import { colonyList } from '../../apps';
console.log('colonyList: ', colonyList);

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
              colonyList.map(app => (
              <li
                key={app.prefix}
                className={`${style.navItem} ${switchPath(app.prefix)}`}>
                 <a onClick={() => goto(app.title, app.prefix)}>{app.name}</a>
              </li>
              ))
            }
          </ul>
        </nav>
      </header>
      <main className={style.main}>
        <Loading loading={loading} />
        <div dangerouslySetInnerHTML={{ __html: content }} className={style.appContainer}/>
      </main>
    </>

  );
}
