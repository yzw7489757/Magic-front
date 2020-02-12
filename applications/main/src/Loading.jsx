/**
* @description Loading
* @author YuanZiWen
* @since 2019-10-23
*/


import React, { memo, useRef, useEffect } from 'react';
import style from './Loading.less';

const Loading = memo(({ loading }) => {
  const loadRef = useRef();

  useEffect(() => {
    if(!loading) return 
    const el = loadRef.current;
    const parentEl = el.parentNode;
    const { position } = window.getComputedStyle(parentEl);
    if (position === 'absolute' || position === 'relative') {
      parentEl.style.position = position;
    } else {
      parentEl.style.position = 'relative';
    }
    return () => {
      parentEl.style.position = position;
    };
  },[loading]);


  return loading ? (
    <div className={style.loading} ref={loadRef}>
      <div aria-busy="true" aria-label="Loading" role="progressbar" className={style.loading_box}>
        <div className={style.loading_dot} />
        <p className={style.loading_text}>Loading</p>
      </div>
    </div>
  ): null;
});

export default Loading;
