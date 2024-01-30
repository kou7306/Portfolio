import React from 'react';
import './Topimg.css';
 // Three.jsコンポーネントをインポート

const Topimg = () => {
  return (
     <div className='img-container text-overlay'>
        
        <div className='top-text canvas'>
          <h1>Kota Yahagi</h1>
          <p>Web Engineer</p>
        </div>
        {/* <img className='top-img' src= "/images/img2.png"></img> */}
    </div>
  )
}

export default Topimg