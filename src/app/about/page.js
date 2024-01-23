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
        <h3>Language</h3>
        <ul className='skill-imgs'>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" /></li>

        </ul>
        <h3>Framework,Library</h3>
        <ul className='skill-imgs'>
        <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" /></li>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" /></li>
        </ul>
      </div>

      <Career/>

      </div>
    </div>
    </div>
  )
}

