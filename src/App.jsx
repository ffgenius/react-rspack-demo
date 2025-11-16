import React from 'react';
import s from './index.module.less';
import img from './assets/images/image.jpg';

export default function App() {
  return <React.Fragment>
    <img src={img} alt="img" className={s.img} />
    <h1 className={`bold ${s.app}`}>Hello React + Rspack</h1>
  </React.Fragment>;
}
