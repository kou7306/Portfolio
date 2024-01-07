import React from 'react'
import './about.css'

export default function Page() {
  return (
    <div className="App">
      <div className='about'>
      <div className='name'>
        <h1>Kota Yahagi</h1>
        <p>矢作恒太</p>
      </div>

      <div className='profile'>
        <h2>Profile</h2>
        <p>今大学３年でロボットの研究をしています。チーム開発が大好きです、趣味はアニメとサッカー観戦です。</p>
      </div>

      <div className='affiliation'>
      <h2>Affiliation</h2>
      <ul>
        <li>Kota Yahagi</li>

        <li>Student in Tsukuba University </li>
        <li>STECH</li>
        <li>PlayGround</li>
      </ul>

      </div>

      <div className='skill'>
        <h2>Skill</h2>
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

      <div className='career'>
        <h2>Career</h2>
        <dl>
          <dt>1990年11月</dt>
          <dd>
            <h2>日本に生まれる</h2>
            <p>詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。</p>
          </dd>
          <dt>1996年4月</dt>
          <dd>
            <h2>小学校に入学</h2>
            <p>詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。</p>
          </dd>
          <dt>2002年4月</dt>
          <dd>
            <h2>中学校に入学</h2>
            <p>詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。</p>
          </dd>
          <dt>2005年4月</dt>
          <dd>
            <h2>高校に入学</h2>
            <p>詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。</p>
          </dd><dt>2008年4月</dt>
          <dd>
            <h2>大学に入学</h2>
            <p>詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。詳細な文章が入ります。</p>
          </dd>
        </dl>
      </div>

      
    </div>
    </div>
  )
}

