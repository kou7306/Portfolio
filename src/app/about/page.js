import React from 'react'
import './about.css'
import Career from './Career'

export default function Page() {
  return (
    <div className="App">
      <div className='about'>
      <div className='name'>
        <div className='name-img'>
          <img src='/images/icon.png' alt='icon' className='icon-img'/>
        </div>
        <div className='name-detail'>
          <h1>Kota Yahagi</h1>
          <p className='name-contents'>矢作恒太</p>
          <p className='profile'>今大学３年でロボットの研究をしています。チーム開発が大好きです、趣味はアニメとサッカー観戦です。</p>
        </div>
      </div>


      <div className='content-all'>
      <div className='affiliation'>
      <h2 className='gradient-border'>Affiliation</h2>
      <ul>


        <li>Student in Tsukuba University </li>
        <li>STECH</li>
        
      </ul>

      </div>

      <div className='skill'>
        <h2 className='gradient-border'>Skill</h2>
        <ul className='skill-imgs'>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
          <li><img className='skill-img' src="https://placehold.jp/50x50.png"/></li>
        </ul>
      </div>

      <Career/>

      </div>
    </div>
    </div>
  )
}

